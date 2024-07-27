
const exp = require('constants');
const moongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
    moongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = moongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        console.log('Connected to the database');
    });
};
