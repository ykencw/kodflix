const express = require('express');
const getTVSeries = require('./tvseries');
const app = express();
const port = 3000;

app.get('/rest/tvseries', (req, res) => res.send(getTVSeries()));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));