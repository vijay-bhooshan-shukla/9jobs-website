const express = require("express");
const stripeRoutes = require("../server/routes/stripe");

const app = express();

app.use(express.json());
app.use("/", stripeRoutes);

module.exports = app;
