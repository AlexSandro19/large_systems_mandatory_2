require("dotenv").config();
const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const axios = require('axios').default;

const studentUrl = "http://localhost:5000/db/getStudent";
const studentUpdateUrl = "http://localhost:5000/db/updateStudent";

const router = Router();

router.post("/addAttendance", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }

        const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"
        console.log("check token: ", token);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const { email } = jwt.verify(token, process.env.JWT_SECRET);
        console.log("email: ", email)
        const student = await axios
            .post(studentUrl, { email })
            .then((response) => response.data)
            .catch((error) => {
                throw error.response;
            });
        if (!student) {
            return res.status(400).json({
                message: "Invalid authorization data",
                errors: [{ value: email, msg: "Student not found", param: "email" }],
            });
        }

        const { attendance } = req.body;
        const { lectureForSemesterId, courseId, courseName, startDateAndTime, endDateAndTime, presence } = attendance
        console.log("req.body: ", req.body);
        // NOTE: token should be in headers -> so you need to create a function that would extract the token from header
        console.log("message after axios", student)

        student.attendance.push({ lectureForSemesterId, courseId, courseName, startDateAndTime, endDateAndTime, presence })
        console.log("updated student", student)
        // const updatedOrder = await C.findByIdAndUpdate(order._id, order, { new: true });
        //console.log(updatedOrder);

        const studentUpdateSent = await axios
            .post(studentUpdateUrl, { student })
            .then((response) => response.data)
            .catch((error) => {
                throw error.response;
            });
        const { studentUpdated } = studentUpdateSent;
        if (studentUpdated) {
            return res.status(200).json({ attendanceAdded: true });
        } else {
            return res.status(500).json({ attendanceAdded: false, message: "Internal Error" });
        }
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "JWT token has expired, please login to obtain a new one",
            });
        }
        // res.status(401).json({ message: "Unauthorized access" });
        console.log(error.message);
        return res.status(500).json({ error: error, message: error.message })

    }
});


module.exports = router;