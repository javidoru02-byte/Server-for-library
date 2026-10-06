const express = require("express");
const errorHandler = require("./middelwares/errorHandler");
const routes = require("./routes/index");

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

module.exports = app;
