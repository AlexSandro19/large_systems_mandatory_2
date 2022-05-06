require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");

// Connect

const app = express();
const PORT = process.env.PORT || 5003;

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
<<<<<<< HEAD:server.js

app.use("/api/auth", require("./auth_micro/auth.routes"));
app.use("/api/report", require("./report_micro/report.routes"));
app.use("/api", require("./db_micro/course.routes"));
app.use("/api", require("./db_micro/student.routes"));
app.use("/api", require("./db_micro/teacher.routes"));
app.use("/api", require("./db_micro/university.routes"));


const PORT = process.env.PORT || 5000;

=======
>>>>>>> 551934a341fb394db3c9d1c5e43d222619b18a46:db_micro/server.js
app.use(express.json())

app.use("", require("./routes/course.routes")); // I dont like this, feels wrong
app.use("", require("./routes/student.routes"));
app.use("", require("./routes/teacher.routes"));
app.use("", require("./routes/university.routes"));


app.get('/test', (req, res) => {
    res.status(200).send('all good from micro_db');
})

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to Mongo");
        app.listen(PORT, () =>
            console.log(`Database Microservice has been started on port ${PORT}...`)
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
