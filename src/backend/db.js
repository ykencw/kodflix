const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://kodflix:temporarypassword@localhost:27017/kodflix';

function connect() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (error, db) => {
            if (error) reject(error);
            const dbo = db.db('kodflix');
            resolve(dbo);
        });
    });
};

module.exports = { connect };