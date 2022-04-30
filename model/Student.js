const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    email: {
        type: String,
        // require: true
    },
    password: {
        type: String,
        // require: true
    },
    coursesForStudent: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Course",
            // require: true
        }
    ],
    attendance: [
        {
            lectureForSemesterId:{
                type: mongoose.Types.ObjectId,
                // require: true
            },
            // week:{
            //     type: Number,
            //     // required: true,
            // },
            presence:{
                type: String,
                // require: true,
                default: "Pending",
                enum: ["Present", "Not Present","Pending"]
            }
        }
    ]
})

const Student = mongoose.model("student", studentSchema);

module.exports = Student;