require("dotenv").config();
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require('axios').default;
const nodemailer = require("nodemailer");

const courseUrl = "http://localhost:5000/db/getCourses";
const studentUrl = "http://localhost:5000/db/getStudents";
const teacherUrl = "http://localhost:5000/db/getTeachers";


const router = Router();

router.get('/test', (req, res) => {
    res.status(200).send('all good from report_micro');
})

router.get(
    "/daily-report", 

    async (req,res)=> {
        const lecturesForToday = []
        const studentsInCourse = []
        const today = new Date("2022-04-24T22:08:30.000+00:00")

        try {

            const students = await axios
            .get(studentUrl)
            .then((response) => response.data)
            .catch((error) => {
                throw error.response;
            });
            const courses = await axios
            .get(courseUrl)
            .then((response) => response.data)
            .catch((error) => {
                throw error.response;
            });
            const teachers = await axios
            .get(teacherUrl)
            .then((response) => response.data)
            .catch((error) => {
                throw error.response;
            });
            console.log("students", students)
            console.log("courses",courses)
           console.log(teachers)
            
            const teachersWithCourses = teachers.map(teacher=>{
                const foundCoursesForTeacher = []
                teacher.coursesForTeacher.forEach(course=>{
                   // console.log("in for each teachers courses",course)
                    
                    const foundCourse = courses.filter(possibleCourse=>{
                        //console.log("possible course",possibleCourse)
                        //console.log("course",course.toString())
                        return ((possibleCourse._id).toString() === course.toString())
                    })
                    foundCoursesForTeacher.push(...foundCourse)
                    //console.log("found course",foundCourse)
                })
               // console.log("for teacher",ForTeacher)
                teacher.foundCourses = foundCoursesForTeacher
                return teacher
            })

            //lecture id
            const teachersWithLecturesForToday = teachersWithCourses.map(teacher =>{
                //console.log("teacher:", teacher)
                teacher.foundCourses.forEach(course =>{
                    const lecturesForToday = course.lecturesForSemester.filter(lecture=>{
                        const lectureDate = new Date(lecture.startDateAndTime)
                        return (today.getMonth() === lectureDate.getMonth() && today.getDate() === lectureDate.getDate())
                    })
                    console.log("lectures",lecturesForToday)
                    teacher.lecturesforToday = [{lecturesForToday, course_id: course._id}]
                    
                })
            
                
                console.log("teacher; ",teacher.lecturesforToday)
                return teacher

            })
            console.log("teachers with lecuter", teachersWithLecturesForToday)

            const attenLecures = []
            const presentStudents = []
        
            let studentsCourse = []
            courses.forEach(course=>{
               const studentsInCourse = course.studentsInCourse.map(studentEmail=>{
                   const studentInCourse = students.filter(student=>{
                        return student.email === studentEmail
                   })
                   //console.log("studentInCOurse", studentInCourse)
                   return studentInCourse[0]
               })
               course.studentsInCourse = studentsInCourse     
               //console.log("course",course)
               studentsCourse.push({"course": course._id,"students": studentsInCourse})
               console.log("students in course: ",studentsCourse)
            })
            //console.log("courses",courses)
            
            const studentsForToday = students.filter(student=>{
                student.attendance.filter(lecture=>{
                    const lectureDate = new Date(lecture.startDateAndTime)
                    return (today.getMonth() === lectureDate.getMonth() && today.getDate() === lectureDate.getDate())
                })
                console.log("student.attendance", student.attendance)
                return student
            })
            let lessonStudents = []
            let reportForTeachers = []
            

           teachersWithLecturesForToday.forEach(teacher=>{
                teacher.lecturesforToday.forEach(lecture=>{
                    students.forEach(student=>{
                        student.attendance.forEach(lesson=>{
                            if(lecture.lectureForSemesterId === lesson.lectureForSemesterId){
                                lessonStudents.push(student)
                            }
                        })
                    })
                    reportForTeachers.push({teacher:teacher.email,lecture:lesson,presence:lessonStudents})
                    
                })
            })
            console.log(reportForTeachers)
           //call e-mail sender  
        return res.json({courses})
        
        }catch (error) {
            console.log(error.message);
        }
})

router.get("/email", 

    async (req, res) => {
    try {
      
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: 'radu.cazacu1@gmail.com',
          pass: ''
        }
      });
      const mailOptions = {
        from: 'radu.cazacu1@gmail.com',
        to: "a.sandrovschii@gmail.com",
        replyTo:"radu.cazacu1@gmail.com",
        subject: "subject",
        text:"Email sent from: "+ "" +' \n Name: ' +'\n Message: '+' ',
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error.message);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
      res.status(200).json({ message: "successfully emailed me "});
    } catch (e) {
      res.status(500).json({ message: "Something went wrong, try again" });
    }
  }


)



module.exports = router;