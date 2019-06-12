require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

const url = process.env.NODE_ENV === 'development' ? process.env.DB_URL_DEV : process.env.DB_URL_PRD;
const dbname = url.split('/').pop();

function connect() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (error, db) => {
            if (error) reject(error);
            const dbo = db.db(dbname);
            resolve(dbo);
        });
    });
};

module.exports = { connect };