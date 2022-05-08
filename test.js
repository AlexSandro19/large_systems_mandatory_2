const { courses } = require("./sample_data.json")
const csv = require('csv')
const fs = require("fs");
const filename = "saved_csv_file.csv";
const writableStream = fs.createWriteStream(filename);

function generateCSV() {
    const columns = [
        "Course Name",
        "Date",
        "Start Time",
        "End Time",
        "Student",
        "Attendance",
    ];
    const saveStudentData = [];

    const stringifier = csv.stringify({ header: true, columns: columns });
    // lets suppose we will have teachers[], and each teacher will have courses
    const globalArrayAllCourses = courses.map(course => {
        const innerArraystudentsInCourse = course.studentsInCourse.map(student => {
            const innerArrayAttendanceForEachStudent = student.attendance.map(lecture => {
                const lectureStartDateAndTime = new Date(lecture.startDateAndTime)
                const lectureEndDateAndTime = new Date(lecture.endDateAndTime)
                const aggreagatedObject = { courseName: course.courseName, date: lectureStartDateAndTime.toDateString(), startTime: lectureStartDateAndTime.toTimeString(), endTime: lectureEndDateAndTime.toTimeString(), student: student.email, attendance: lecture.presence }
                // console.log("aggreagatedObject:", aggreagatedObject);
                const propertyValues = Object.values(aggreagatedObject);
                // console.log(propertyValues);
                saveStudentData.push(propertyValues);
            })
        })
    })

    console.log("saveStudentData: ", saveStudentData);

    saveStudentData.forEach(dataRow => {
        stringifier.write(dataRow);

    })
    stringifier.pipe(writableStream);
console.log("Finished writing data");
}

generateCSV();