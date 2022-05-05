require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const proxy = require("express-http-proxy")
// Connect

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.json())

app.use("/auth", proxy("http://localhost:5001"));
app.use("/attendance", proxy("http://localhost:5002"));
app.use("/db", proxy("http://localhost:5003"));


app.get('/test', (req, res) => {
    res.status(200).send('all good from proxy');
})

app.listen(PORT, () =>
    console.log(`Proxy Microservice has been started on port ${PORT}...`)
); // add error handling 
