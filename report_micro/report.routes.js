require("dotenv").config();
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require('axios').default;
const { check, validationResult } = require("express-validator");

const Student = require("../model/Student");
const Teacher = require("../model/Teacher");
const Course = require("../model/Course")

const loginUrl = "http://localhost:5000/api/getStudent";
const courseUrl = "http://localhost:5000/api/getCourse";
const universityGeolocationsUrl = "http://localhost:5000/api/getUniversityGeolocations";
const checkStudentInUniveristyUrl = "http://localhost:5000/api/checkStudentInUniveristy";

const router = Router();

router.get(
    "/daily-report", 

    async (req,res)=> {
        const lecturesForToday = []
        const studentsInCourse = []
        
        try {
            const courses = await Course.find()
            const teachers = await Teacher.find()
           // console.log(courses)
            //console.log(teachers)
            
            const aray = teachers.map(teacher=>{
                const ForTeacher = []
                teacher.coursesForTeacher.forEach(course=>{
                   // console.log("in for each teachers courses",course)
                    
                    const foundCourse = courses.filter(possibleCourse=>{
                        //console.log("possible course",possibleCourse)
                        //console.log("course",course.toString())
                        return ((possibleCourse._id).toString() === course.toString())
                    })
                    ForTeacher.push(...foundCourse)
                    //console.log("found course",foundCourse)
                })
               // console.log("for teacher",ForTeacher)
                teacher.forTeacher = ForTeacher
                return teacher
            })
            console.log(aray)

          
            //console.log(teachers)
            //console.log(teachersForToday)
            
            

           /* courses.forEach(course=>{
                for (i in course.lecturesForSemester){
                    const today = new Date(course.lecturesForSemester[i].startDateAndTime)
                    if (today.getMonth() === course.lecturesForSemester[i].startDateAndTime.getMonth() 
                     && today.getDate() === course.lecturesForSemester[i].startDateAndTime.getDate()){ 
                        console.log(course.lecturesForSemester[i])
                        lecturesForToday.push({"course": course.courseName,"lecture": course.lecturesForSemester[i]})
    
                    }
                        
                }
            })*/
            const coursesForToday = courses.filter(course =>{
                
            })       
           
            
        
        }catch (error) {
            console.log(error.message);
        }
})

module.exports = router;