require('dotenv').config();

export const facebook = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  profileFields: ['id', 'name', 'displayName', 'photos', 'email', 'about', 'address', 'birthday', 'gender', 'location'],
};

