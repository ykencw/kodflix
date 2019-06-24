const express = require('express');
const db = require('./db');
const path = require('path');
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const app = express();
const port = process.env.PORT || 3001;
const buildPath = '../../build';

const connection = db.connect();

app.get('/rest/tvshows/:show', (req, res) => {
    connection.then(dbo => {
        dbo.collection('tvshows').findOne({ id: req.params.show },
            (error, result) => {
                if (error) Promise.reject(error);
                res.send(result);
            }
        );
    });
});

app.get('/rest/tvshows', (_req, res) => {
    connection.then(dbo => {
        dbo.collection('tvshows').find({}).toArray((error, results) => {
            if (error) Promise.reject(error);
            res.send(results);
        });
    });
});

app.post('/login', jsonParser, (req, res) => {
    res.send('test, username: ' + req.body.username + " password: " + req.body.password);
});

app.use(express.static(path.join(__dirname, buildPath)));
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, buildPath, 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));