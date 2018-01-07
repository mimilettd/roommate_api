import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
var app = require('../app');
import { facebook } from '../facebook';

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/facebook' }),
  // Redirect user back to the mobile app using Linking with a custom protocol OAuthLogin
  (req, res) => res.redirect('OAuthLogin://login?user=' + JSON.stringify(req.user)));

