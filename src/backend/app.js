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
    // Create Admin account (or update if one already exists)
    let md = forge.md.sha256.create();
    md.update(DB_ADMIN_PWD);
    const password = md.digest().toHex();
    bcrypt.hash(password, SALT_ROUNDS).then(hashedPassword => {
        users.updateOne(
            { username: 'Admin' },
            {
                $set: {
                    password: hashedPassword,
                    isAdmin: true
                }
            },
            { upsert: true }
        );
    });
});

// Validate user logins
app.post('/login', jsonParser, (req, response) => {
    const { username, password } = req.body;
    response.setHeader('Content-Type', 'application/json')
    if (typeof username !== 'string' || typeof password !== 'string') {
        response.send("Invalid input");
    }
    connection.then(dbo => {
        dbo.collection('users').findOne({ username }, (error, result) => {
            if (error) Promise.reject(error);
            if (result) { // User found
                bcrypt.compare(password, result.password, (err, res) => {
                    if (err) Promise.reject(err);
                    if (res) { // Check if the password is valid for user
                        if (result.isAdmin) {
                            req.session.isAdmin = true;
                            req.session.username = username;
                        }
                        response.end(JSON.stringify({
                            result: true,
                            message: 'Successful login!',
                            username
                        }));
                    } else { // Invalid Password
                        response.end(JSON.stringify({
                            result: false,
                            message: 'Invalid login details'
                        }));
                    }
                });
            } else { // User could not be found
                response.end(JSON.stringify({
                    result: false,
                    message: 'Invalid login details'
                }));
            }
        }
        );
    });
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