const express = require('express');
const db = require('./db');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
const buildPath = '../../build';

const connection = db.connect();

app.get('/rest/tvseries', (_req, res) => {
    connection.then(dbo => {
        dbo.collection('tvseries').find({}).toArray((error, results) => {
            if (error) Promise.reject(error);
            res.send(results);
        });
    });
});

app.use(express.static(path.join(__dirname, buildPath)));
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, buildPath, 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));