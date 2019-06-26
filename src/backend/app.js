const express = require('express');
const db = require('./db');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const multer = require('multer');
const upload = multer({
    dest: 'temp/', limits: {
        fieldSize: 3 * 1000, // Fields can't be larger than 3KB
        fields: 10,
        fileSize: 2.5 * 1000 * 1000, // Files can't be larger than 2.5MB
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
    req.session.destroy();
    res.end(JSON.stringify({
        result: true,
        message: 'Successfully Logged out!'
    }));
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

app.get('/rest/tvshows', (req, res) => {
    connection.then(dbo => {
        dbo.collection('tvshows').find({}).toArray((error, results) => {
            if (error) Promise.reject(error);
            res.send(results);
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
}]), (req, res, next) => {
    if (!req.session.isAdmin) { // End early if post is not from an admin
        res.send(401);
        next();
    }
    // console.log(path.join(__dirname, "../frontend/common/images"));
    // let {id, title, synopsis, videoID} = req.body;
    // let 
    //
    // Set default values and reject requests with invalid values
    // if (id.length === 0 || blacklist.imageNames.includes(id)) {
    //  res.send(401);
    //  next();
    // }
    // if (title.length === 0) {
    //  res.send(401);
    //  next();
    // }
    // if (synopsis.length === 0) {
    //  empty synopsis here
    // }
    // if (videoID.length === 0) {
    //  videoID = 'VO38aC2z6ck';
    // }
    // if (req.files['imageCover'].length === 0) {
    //  Set image as default imageCover
    // }
    // if (req.files['imageBackground'].length === 0) {
    //  Set image as default imageBackground
    // }



    console.log(Object.entries(req));
    // if (req.) {
    //     return res.end()
    // }
    let formData = req.body;
    console.log("Form data: " + Object.entries(formData));
    if (req.files['imageCover']) {
        console.log("Length of imageCover array is: " + req.files['imageCover'].length)
        let imageCover = req.files['imageCover'][0]
        console.log("ImageCover: " + imageCover +
            "image fieldname: " + imageCover.fieldname +
            "image originalname: " + imageCover.originalname +
            "image encoding: " + imageCover.encoding +
            "image mimetype: " + imageCover.mimetype +
            "image size: " + imageCover.size +
            "image destination: " + imageCover.destination +
            "image filename: " + imageCover.filename +
            "image path: " + imageCover.path +
            "image buffer: " + imageCover.buffer
        );
    }
    let imageCoverPath = path.join(__dirname,
        "../frontend/common/images/covers");
    let imageBackgroundPath = path.join(__dirname,
        "../frontend/common/images/wallpapers");
    console.log(imageCoverPath);
    console.log(imageBackgroundPath);
    // console.log("ImageBackground: " + req.files['imageBackground'][0]);

    // Add new movie into database
    // connection.then(dbo => {
    //     dbo.collection('tvshows').updateOne(
    //         { id },
    //         {
    //             $set: {
    //                 title,
    //                 synopsis,
    //                 videoID
    //             }
    //         },
    //         { upsert: true }
    //     );
    // });
    res.end('goood');
});

app.use(express.static(path.join(__dirname, buildPath)));
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, buildPath, 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));