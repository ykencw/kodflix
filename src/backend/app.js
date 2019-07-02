const express = require('express');
const db = require('./db');
const Binary = require('mongodb').Binary;
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const multer = require('multer');
const upload = multer({
    dest: 'temp/', limits: {
        fieldSize: 3 * 1000, // Fields can't be larger than 3Kb
        fields: 10,
        fileSize: 1.2 * 1000 * 1000, // Files can't be larger than 1.2Mb
        files: 2,
        parts: 12
    }
});
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 12;
const forge = require('node-forge');
const app = express();
const port = process.env.PORT || 3001;
const DB_ADMIN_PWD = process.env.DB_ADMIN_PWD;
const buildPath = '../../build';
const blacklist = {
    imageNames: ['default']
};

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

// Check if user is already logged in 
app.get('/loggedin', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.session.username) {
        res.end(JSON.stringify({
            result: true,
            username: req.session.username,
            ...(req.session.isAdmin ? { isAdmin: true } : {})
        }));
    } else {
        res.end(JSON.stringify({
            result: false
        }));
    }
});

// Validate user logins
app.post('/login', jsonParser, (req, response, next) => {
    const { username, password } = req.body;
    response.setHeader('Content-Type', 'application/json');
    // End early if invalid input is received
    if (typeof username !== 'string' || typeof password !== 'string') {
        response.send(401);
        return next();
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
                            username,
                            ...(result.isAdmin ? { isAdmin: true } : {})
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
        });
    });
});

app.get('/logout', (req, res) => {
    console.log(req.session.id);
    const id = req.session.id;
    req.session.destroy(err => {
        if (err) {
            console.log(err)
            res.end(JSON.stringify({
                result: false,
                message: 'Could not Log out!'
            }));
        } else {
            connection.then(dbo => {
                dbo.collection('sessions').deleteOne({ _id: id },
                    (error, result) => {
                        if (error) Promise.reject(error);
                        console.log("Session deleted from database: " + result);
                        res.end(JSON.stringify({
                            result: true,
                            message: 'Successfully Logged out!'
                        }));
                    }
                );
            });
        }
    });
});

app.get('/rest/tvshows/:tvshow', (req, res) => {
    connection.then(dbo => {
        dbo.collection('tvshows').findOne({ id: req.params.tvshow },
            (error, result) => {
                if (error) Promise.reject(error);
                if (req.header('KYK-Excludes')) {
                    res.send({
                        ...result,
                        ...getExcludes(req.header('KYK-Excludes'))
                    });
                } else {
                    res.send(result);
                }
            }
        );
    });
});

app.get('/rest/tvshows', (req, res) => {
    connection.then(dbo => {
        dbo.collection('tvshows').find({}).toArray((error, results) => {
            if (error) Promise.reject(error);
            if (req.header('KYK-Excludes')) {
                res.send(results.map(tvshow => {
                    return { 
                        ...tvshow, 
                        ...getExcludes(req.header('KYK-Excludes'))
                    };
                }));
            } else {
                res.send(results);
            }
        });
    });
});

app.post('/rest/admin/addTVShow', upload.fields([{
    name: 'imageCover',
    maxCount: 1
},
{
    name: 'imageBackground',
    maxCount: 1
}]), (req, res) => {
    if (!req.session.isAdmin) { // End early if post is not from an admin
        res.sendStatus(401);
        return;
    }
    let { id, title, synopsis, videoID } = req.body;
    let imageCover;
    let imageBackground;
    // Set default values and reject requests with invalid values
    if (id.length === 0 || blacklist.imageNames.includes(id)) {
        res.sendStatus(401);
        return;
    }
    if (title.length === 0) {
        res.sendStatus(401);
        return;
    }
    if (!synopsis) {
        synopsis = '';
    }
    if (!videoID) {
        videoID = 'VO38aC2z6ck';
    }
    if (req.files['imageCover']) {
        imageCover = req.files['imageCover'][0]
        imageCover = {
            mimetype: imageCover.mimetype,
            data: Binary(fs.readFileSync(imageCover.path))
        };
    }
    if (req.files['imageBackground']) {
        imageBackground = req.files['imageBackground'][0];
        imageBackground = {
            mimetype: imageCover.mimetype,
            data: Binary(fs.readFileSync(imageBackground.path))
        }
    }
    // Add new tvshow into database
    connection.then(dbo => {
        dbo.collection('tvshows').findOne({ id }, (error, result) => {
            if (error) Promise.reject(error);
            if (result) {
                res.end(JSON.stringify({
                    result: false,
                    message: 'TVShow already exists in Database!'
                }));
            } else {
                dbo.collection('tvshows').insertOne(
                    {
                        id,
                        title,
                        synopsis,
                        videoID,
                        ...(imageCover && { imageCover }),
                        ...(imageBackground && { imageBackground })
                    },
                    (error, _result) => {
                        if (error) Promise.reject(error);
                        console.log("Adding new tvshow to database, Result: " + 
                            _result);
                        res.end(JSON.stringify({
                            result: true,
                            message: 'Successfully Added TVShow to Database!'
                        }));
                    }
                );
            }
        });
    });
});

app.delete('/rest/admin/delete/:tvshow', (req, res) => {
    const id = req.params.tvshow;
    console.log(`DELETE Request received, TVShow ID: ${id}`);
    connection.then(dbo => {
        dbo.collection('tvshows').deleteOne({ id },
            (error, response) => {
                if (error) Promise.reject(error);
                if (response.result.ok) {
                    console.log(
                        `Deleted TVShow from database, result: ${response}`);
                    res.end(JSON.stringify({
                        result: true,
                        message: `Successfully Deleted TVShow ${id}!`
                    }));
                } else {
                    console.log(
                        `Failed to Delete TVShow from database, result: ${
                            response
                        }`);
                    res.end(JSON.stringify({
                        result: false,
                        message: `Database could not delete ${id}`
                    }));
                }
            }
        );
    });
});

app.use(express.static(path.join(__dirname, buildPath)));
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, buildPath, 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

function getExcludes(excludeList) {
    return excludeList.split(';').reduce(
        (acc, keyToExclude) => {
            acc[keyToExclude] = undefined;
            return acc;
        },
        {}
    );
}