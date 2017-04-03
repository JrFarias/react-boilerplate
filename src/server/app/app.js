const express = require('express'); //eslint-disable-line
const universalLoader = require('./universal');

const app = express();

// Serve static assets
app.use(express.static('client'));

app.use('/', universalLoader);

module.exports = app;
