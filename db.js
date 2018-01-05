var mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds241677.mlab.com:41677/roommates`, { useMongoClient: true });
