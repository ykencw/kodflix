require('dotenv').config();

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const DB_SESSION_SALT = process.env.DB_SESSION_SALT;
const MongoClient = require('mongodb').MongoClient;

const url = process.env.NODE_ENV === 'development' ?
    process.env.DB_URL_DEV :
    process.env.DB_URL_PRD;
const dbname = url.split('/').pop();

function connect() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, { useNewUrlParser: true }, (error, db) => {
            if (error) {
                reject(error);
            } else {
                const dbo = db.db(dbname);
                resolve(dbo);
            }
        });
    });
};

function sessionStore() {
    return session({
        secret: DB_SESSION_SALT,
        cookie: { maxAge: 10 * 60 * 1000 },
        resave: true,
        rolling: true, // Updates client session id so they don't expire early
        saveUninitialized: false, // Save space by ignoring uninit'd cookies
        store: new MongoStore({
            url,
            collection: 'sessions'
        })
    });
}

module.exports = { connect, sessionStore };