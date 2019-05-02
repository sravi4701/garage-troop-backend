const mongoose = require('mongoose');
const config = require('config');

const DB_URI = config.get('db.DB_URI');

mongoose.Promise = global.Promise;

const options = {
    useCreateIndex: true, // default false
    autoIndex: false, // default true
    useNewUrlParser: true, // port is required in mongodb connection string
    // useFindAndModify: false // by default is true, when it is true then
    // then it call findAndModify when it is false then it calls findOneAndUpdate
    // or findOneAndDelete
    autoReconnect: true, // it will try to reconnect automatically when fails to connect
    reconnectTries: Number.MAX_VALUE, // no of retry
    reconnectInterval: 2000, // retry in  2 seconds
    promiseLibrary: Promise // we use bluebird promise to manage async calls
};

const conn = mongoose.createConnection(DB_URI, options);


conn.on('connecting', () => {
    console.log(`connecting to mongodb ${DB_URI}`);
});

conn.on('connected', () => {
    console.log(`connected to mongodb ${DB_URI}`);
});

conn.on('reconnected', () => {
    console.log(`re connected to mongodb ${DB_URI}`);
});

conn.on('disconnected', () => {
    console.log(`disconnected from mongodb ${DB_URI}`);
});

conn.on('error', () => {
    console.log(`error while connecting to ${DB_URI}`);
});


module.exports = conn;
