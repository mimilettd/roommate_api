const app = require('./app');
const port = process.env.PORT || 3000;
const User = require('./user/User')
//import express from 'express';
const express = require('express')
const passport = require('passport')
//import passport from 'passport';
const FacebookStrategy = require ('passport-facebook')
//import FacebookStrategy from 'passport-facebook';
// Import Facebook and Google OAuth apps configs
//import { facebook } from './facebook';
const facebook = require('./facebook')
const jwt = require('jsonwebtoken')
const config = require ('./config')

// Transform Facebook profile because Facebook and Google profile objects look different
// and we want to transform them into user objects that have the same set of attributes
const transformFacebookProfile = (profile) => ({
  name: profile.name,
  avatar: profile.picture.data.url,
});

// Register Facebook Passport strategy
passport.use(new FacebookStrategy(facebook,
  // Gets called when user authorizes access to their profile

    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'facebook_id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    var token = jwt.sign({ id: user._id }, config.secret, {
                      expiresIn: 86400 // expires in 24 hours
                    });
                    return done(null, {user: user, token: token}); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();

                    // set all of the facebook information in our user model
                    newUser.facebook_id    = profile.id; // set the users facebook id
                    newUser.facebook_token = token; // we will save the token that facebook provides to the user
                    newUser.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                    newUser.gender = profile.gender;
                    newUser.location = profile.location;
                    newUser.picture = profile.picture
                    newUser.email = profile.email; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        var token = jwt.sign({ id: newUser._id }, config.secret, {
                          expiresIn: 86400 // expires in 24 hours
                        });
                        return done(null, newUser, token);
                    });
                }

            });
        });

    }));
// Serialize user into the sessions
passport.serializeUser((user, done) => done(null, user));

// Deserialize user from the sessions
passport.deserializeUser((user, done) => done(null, user));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up Facebook auth routes
app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
  // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
  (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
