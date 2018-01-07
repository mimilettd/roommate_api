require('dotenv').config();

const facebook = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'https://salty-sea-38186.herokuapp.com/auth/facebook/callback',
  profileFields: ['id', 'name', 'displayName', 'photos', 'email', 'about', 'address', 'birthday', 'gender', 'location'],
};

module.exports = facebook
