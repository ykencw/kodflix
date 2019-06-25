const express = require('express');
const db = require('./db');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;
const forge = require('node-forge');
const app = express();
const port = process.env.PORT || 3001;
const DB_ADMIN_PWD = process.env.DB_ADMIN_PWD;
const buildPath = '../../build';

app.use(db.sessionStore());

const connection = db.connect();

connection.then(dbo => {
    const users = dbo.collection('users');
    // Check if Admin exists:
    users.findOne({ name: 'Admin' },
        (error, result) => {
            if (error) Promise.reject(error);
            // If Admin does not exist, create Admin
            if (!result) {
                let md = forge.md.sha256.create();
                md.update(DB_ADMIN_PWD);
                const password = md.digest().toHex();
                bcrypt.hash(password, SALT_ROUNDS).then(hpw => {
                    users.insertOne({ name: 'Admin', password: hpw });
                });
            }
        }
    );
});

// Test if password received matches the Admin's password:
app.post('/login', jsonParser, (req, response) => {
    const { username, password } = req.body;
    if (username === 'Admin') {
        connection.then(dbo => {
            dbo.collection('users').findOne({ name: username },
                (error, result) => {
                    if (error) Promise.reject(error);
                    bcrypt.compare(password, result.password, (err, res) => {
                        if (res) {
                            req.session.isAdmin = true;
                            req.session.username = 'Admin';
                            response.setHeader('Content-Type', 'application/json')
                            response.end(JSON.stringify({test: 'Successful login!'}));
                        } else {
                            response.send(err);
                            console.log("Result of bcrypt compare: " + err);
                        }
                    });
                }
            );
        });
    }
});

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

app.use(express.static(path.join(__dirname, buildPath)));
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, buildPath, 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));