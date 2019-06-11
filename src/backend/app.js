const express = require('express');
const getTVSeries = require('./tvseries');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
const buildPath = '../../build';

app.use(express.static(path.join(__dirname, buildPath)));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, buildPath, 'index.html'));
});

app.get('/rest/tvseries', (req, res) => res.send(getTVSeries()));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));