require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");

// Connect

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/auth", require("./auth_micro/auth.routes"));
app.use("/api", require("./db_micro/course.routes"));
app.use("/api", require("./db_micro/student.routes"));
app.use("/api", require("./db_micro/teacher.routes"));
app.use("/api", require("./db_micro/university.routes"));

const PORT = process.env.PORT || 5000;

app.use(express.json())

app.get('/students', (req, res) => {
    res.status(200).send('all good');
})

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Mongo");
        app.listen(PORT, () =>
            console.log(`App has been started on port ${PORT}...`)
        );
    } catch (e) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
    mongoose.connection.on('error', err => {
        logError(err);
    });
    // mongoose.connection.on('disconnected', err => {
    //   console.log("Disconnected from Mongo");
    //   logError(err);
    // });

}

start();
