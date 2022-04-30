require("dotenv").config();
const { Router } = require("express");
const { check, validationResult } = require("express-validator");

const Student = require("../model/Student")


const router = Router();

router.get("/getStudents", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        const allStudents = await Student.find({});
        // const updatedOrder = await C.findByIdAndUpdate(order._id, order, { new: true });
        //console.log(updatedOrder);
        return res.status(200).json(allStudents);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error, message: error.message })

    }
})

router.post("/getStudent", async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data while sending",
            });

        }
        console.log("inside student.routes.js > getStudent: ", req.body)
        const { email } = req.body
        const student = await Student.findOne({ email });
        console.log(`Student: ${student}`);
        return res.status(200).json(student);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error, message: error.message })

    }
})


module.exports = router;