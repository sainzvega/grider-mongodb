const express = require("express");
const router = require('./routes/routes'); // TODO: change to index.js

const app = express();

router(app);

module.exports = app;
