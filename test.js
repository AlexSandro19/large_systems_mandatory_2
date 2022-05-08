
const csv = require('csv')
const fs = require("fs");

function generateCSV() {
    const columns = [
        "Course Name",
        "Date",
        "Start Time",
        "End Time",
        "Student",
        "Attendance",
    ];


    
    teachers.forEach(teacher => {
        const saveStudentData = [];
       
        const filename =  `${teacher.email}.csv`;
        const writableStream = fs.createWriteStream(filename);
    
        const stringifier = csv.stringify({ header: true, columns: columns });
        // lets suppose we will have teachers[], and each teacher will have courses
        const globalArrayAllCourses = teacher.coursesForTeacher.map(course => {
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

    })

}

const teachersWithLecturesAndStudentsForToday = [
    {
        "_id": "62684e4732509c342d776afe",
        "email": "arturo@kea.dk",
        "password": "testing123",
        "coursesForTeacher": [
            {
                "_id": "62666c8732509c342d776af0",
                "courseName": "Testing",
                "teacher": null,
                "studentsInCourse": [
                    {
                        "_id": "62684fb632509c342d776b04",
                        "email": "alex155r@stud.kea.dk",
                        "password": "$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS",
                        "coursesForStudent": [
                            "62666c8732509c342d776af0",
                            "626c641d971a4c7fd74ce2d4",
                            "62781cacaa8f596c5ff79167"
                        ],
                        "attendance": [
                            {
                                "lectureForSemesterId": "6268542332509c342d776b05",
                                "courseId": "62666c8732509c342d776af0",
                                "courseName": "Some COurse Name",
                                "startDateAndTime": "2022-04-24T22:12:30.000Z",
                                "endDateAndTime": "2022-04-24T22:14:00.000Z",
                                "presence": "Present",
                                "_id": "626ed893c569b13987a70a0e"
                            },
                            {
                                "lectureForSemesterId": "6268542332509c342d776b05",
                                "courseId": "62666c8732509c342d776af0",
                                "courseName": "Some COurse Name",
                                "startDateAndTime": "2022-04-24T22:12:30.000Z",
                                "endDateAndTime": "2022-04-24T22:14:00.000Z",
                                "presence": "Present",
                                "_id": "626ed91c33cedcf065bdeee7"
                            },
                            {
                                "lectureForSemesterId": "6268542332509c342d776b05",
                                "courseId": "62666c8732509c342d776af0",
                                "courseName": "Some COurse Name",
                                "startDateAndTime": "2022-04-24T22:12:30.000Z",
                                "endDateAndTime": "2022-04-24T22:14:00.000Z",
                                "presence": "Present",
                                "_id": "626eda1133cedcf065bdeef1"
                            },
                            {
                                "lectureForSemesterId": "6268542332509c342d776b05",
                                "courseId": "62666c8732509c342d776af0",
                                "courseName": "test",
                                "startDateAndTime": "2022-04-24T22:12:30.000Z",
                                "endDateAndTime": "2022-04-24T22:14:00.000Z",
                                "presence": "Present",
                                "_id": "626eda2d33cedcf065bdeef8"
                            },
                            {
                                "lectureForSemesterId": "6268542332509c342d776b05",
                                "courseId": "62666c8732509c342d776af0",
                                "courseName": "test",
                                "startDateAndTime": "2022-04-24T22:12:30.000Z",
                                "endDateAndTime": "2022-04-24T22:14:00.000Z",
                                "presence": "Present",
                                "_id": "626faf6450d67794b215a35b"
                            }
                        ],
                        "universityAttended": "626854bd32509c342d776b0a"
                    },
                    {
                        "_id": "626c53a4971a4c7fd74ce2ce",
                        "email": "radu0195@stud.kea.dk",
                        "password": "$2b$12$i1aXHjC.h9nl2UyyMPILYOjuWEZOr4w7N2DVO07dLn1vKHhA7HWX6",
                        "coursesForStudent": [
                            "62666c8732509c342d776af0"
                        ],
                        "attendance": [
                            {
                                "presence": "Pending"
                            }
                        ],
                        "universityAttended": "626854bd32509c342d776b0a"
                    },
                    {
                        "_id": "626c53d0971a4c7fd74ce2cf",
                        "email": "alek2686@stud.kea.dk",
                        "password": "$2b$12$1K9TyNcdQ3o/rDJTXCxVMeffL6nhNEadpjJnSMSE3QYeLsZ0FrBLy",
                        "coursesForStudent": [
                            "62666c8732509c342d776af0"
                        ],
                        "attendance": [
                            ""
                        ],
                        "universityAttended": "626854bd32509c342d776b0a"
                    }
                ],
                "lecturesForSemester": [
                    {
                        "lectureForSemesterId": "62666ce532509c342d776af1",
                        "startDateAndTime": "2022-04-24T22:08:30.000Z",
                        "endDateAndTime": "2022-04-24T22:10:00.000Z"
                    },
                    {
                        "lectureForSemesterId": "62666f4a32509c342d776af2",
                        "startDateAndTime": "2022-04-24T22:10:30.000Z",
                        "endDateAndTime": "2022-04-24T22:12:00.000Z"
                    }
                ],
                "geolocationId": "6268574332509c342d776b0c",
                "lecturesForToday": [
                    {
                        "lectureForSemesterId": "62666ce532509c342d776af1",
                        "startDateAndTime": "2022-04-24T22:08:30.000Z",
                        "endDateAndTime": "2022-04-24T22:10:00.000Z"
                    },
                    {
                        "lectureForSemesterId": "62666f4a32509c342d776af2",
                        "startDateAndTime": "2022-04-24T22:10:30.000Z",
                        "endDateAndTime": "2022-04-24T22:12:00.000Z"
                    }
                ]
            }
        ]
    },
    {
        "_id": "626c645f971a4c7fd74ce2e1",
        "email": "tomas@kea.dk",
        "password": "databases123",
        "coursesForTeacher": [
            {
                "_id": "626c641d971a4c7fd74ce2d4",
                "courseName": "Databases",
                "teacher": "626c645f971a4c7fd74ce2e1",
                "studentsInCourse": [
                    {
                        "_id": "62684fb632509c342d776b04",
                        "email": "alex155r@stud.kea.dk",
                        "password": "$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS",
                        "coursesForStudent": [
                            "62666c8732509c342d776af0",
                            "626c641d971a4c7fd74ce2d4",
                            "62781cacaa8f596c5ff79167"
                        ],
                        "attendance": [
                            {
                                "lectureForSemesterId": "6268542332509c342d776b05",
                                "courseId": "62666c8732509c342d776af0",
                                "courseName": "Some COurse Name",
                                "startDateAndTime": "2022-04-24T22:12:30.000Z",
                                "endDateAndTime": "2022-04-24T22:14:00.000Z",
                                "presence": "Present",
                                "_id": "626ed893c569b13987a70a0e"
                            },
                            {
                                "lectureForSemesterId": "6268542332509c342d776b05",
                                "courseId": "62666c8732509c342d776af0",
                                "courseName": "Some COurse Name",
                                "startDateAndTime": "2022-04-24T22:12:30.000Z",
                                "endDateAndTime": "2022-04-24T22:14:00.000Z",
                                "presence": "Present",
                                "_id": "626ed91c33cedcf065bdeee7"
                            },
                            {
                                "lectureForSemesterId": "6268542332509c342d776b05",
                                "courseId": "62666c8732509c342d776af0",
                                "courseName": "Some COurse Name",
                                "startDateAndTime": "2022-04-24T22:12:30.000Z",
                                "endDateAndTime": "2022-04-24T22:14:00.000Z",
                                "presence": "Present",
                                "_id": "626eda1133cedcf065bdeef1"
                            },
                            {
                                "lectureForSemesterId": "6268542332509c342d776b05",
                                "courseId": "62666c8732509c342d776af0",
                                "courseName": "test",
                                "startDateAndTime": "2022-04-24T22:12:30.000Z",
                                "endDateAndTime": "2022-04-24T22:14:00.000Z",
                                "presence": "Present",
                                "_id": "626eda2d33cedcf065bdeef8"
                            },
                            {
                                "lectureForSemesterId": "6268542332509c342d776b05",
                                "courseId": "62666c8732509c342d776af0",
                                "courseName": "test",
                                "startDateAndTime": "2022-04-24T22:12:30.000Z",
                                "endDateAndTime": "2022-04-24T22:14:00.000Z",
                                "presence": "Present",
                                "_id": "626faf6450d67794b215a35b"
                            }
                        ],
                        "universityAttended": "626854bd32509c342d776b0a"
                    },
                    {
                        "_id": "626c53a4971a4c7fd74ce2ce",
                        "email": "radu0195@stud.kea.dk",
                        "password": "$2b$12$i1aXHjC.h9nl2UyyMPILYOjuWEZOr4w7N2DVO07dLn1vKHhA7HWX6",
                        "coursesForStudent": [
                            "62666c8732509c342d776af0"
                        ],
                        "attendance": [
                            {
                                "presence": "Pending"
                            }
                        ],
                        "universityAttended": "626854bd32509c342d776b0a"
                    },
                    {
                        "_id": "626c53d0971a4c7fd74ce2cf",
                        "email": "alek2686@stud.kea.dk",
                        "password": "$2b$12$1K9TyNcdQ3o/rDJTXCxVMeffL6nhNEadpjJnSMSE3QYeLsZ0FrBLy",
                        "coursesForStudent": [
                            "62666c8732509c342d776af0"
                        ],
                        "attendance": [
                            ""
                        ],
                        "universityAttended": "626854bd32509c342d776b0a"
                    }
                ],
                "lecturesForSemester": [
                    {
                        "lectureForSemesterId": "62666ce532509c342d776af1",
                        "startDateAndTime": "2022-04-24T22:12:30.000Z",
                        "endDateAndTime": "2022-04-24T22:14:00.000Z"
                    },
                    {
                        "lectureForSemesterId": "626d4a1a971a4c7fd74ce2ef",
                        "startDateAndTime": "2022-04-25T22:08:30.000Z",
                        "endDateAndTime": "2022-04-25T22:10:00.000Z"
                    }
                ],
                "geolocationId": "6268574332509c342d776b0c",
                "lecturesForToday": [
                    {
                        "lectureForSemesterId": "62666ce532509c342d776af1",
                        "startDateAndTime": "2022-04-24T22:12:30.000Z",
                        "endDateAndTime": "2022-04-24T22:14:00.000Z"
                    }
                ]
            }
        ]
    },
    {
        "_id": "6278206aaa8f596c5ff7918e",
        "email": "faisal@kea.dk",
        "password": "science123",
        "coursesForTeacher": [
            {
                "_id": "62781cacaa8f596c5ff79167",
                "courseName": "Computer-Science",
                "teacher": null,
                "studentsInCourse": [
                    {
                        "_id": "62684fb632509c342d776b04",
                        "email": "alex155r@stud.kea.dk",
                        "password": "$2b$12$bgxcFFePzeiFuKl84XrUhu/aUMYCLG3d8CB8CAQikybTiqxxejqhS",
                        "coursesForStudent": [
                            "62666c8732509c342d776af0",
                            "626c641d971a4c7fd74ce2d4",
                            "62781cacaa8f596c5ff79167"
                        ],
                        "attendance": [
                            {
                                "lectureForSemesterId": "6268542332509c342d776b05",
                                "courseId": "62666c8732509c342d776af0",
                                "courseName": "Some COurse Name",
                                "startDateAndTime": "2022-04-24T22:12:30.000Z",
                                "endDateAndTime": "2022-04-24T22:14:00.000Z",
                                "presence": "Present",
                                "_id": "626ed893c569b13987a70a0e"
                            },
                            {
                                "lectureForSemesterId": "6268542332509c342d776b05",
                                "courseId": "62666c8732509c342d776af0",
                                "courseName": "Some COurse Name",
                                "startDateAndTime": "2022-04-24T22:12:30.000Z",
                                "endDateAndTime": "2022-04-24T22:14:00.000Z",
                                "presence": "Present",
                                "_id": "626ed91c33cedcf065bdeee7"
                            },
                            {
                                "lectureForSemesterId": "6268542332509c342d776b05",
                                "courseId": "62666c8732509c342d776af0",
                                "courseName": "Some COurse Name",
                                "startDateAndTime": "2022-04-24T22:12:30.000Z",
                                "endDateAndTime": "2022-04-24T22:14:00.000Z",
                                "presence": "Present",
                                "_id": "626eda1133cedcf065bdeef1"
                            },
                            {
                                "lectureForSemesterId": "6268542332509c342d776b05",
                                "courseId": "62666c8732509c342d776af0",
                                "courseName": "test",
                                "startDateAndTime": "2022-04-24T22:12:30.000Z",
                                "endDateAndTime": "2022-04-24T22:14:00.000Z",
                                "presence": "Present",
                                "_id": "626eda2d33cedcf065bdeef8"
                            },
                            {
                                "lectureForSemesterId": "6268542332509c342d776b05",
                                "courseId": "62666c8732509c342d776af0",
                                "courseName": "test",
                                "startDateAndTime": "2022-04-24T22:12:30.000Z",
                                "endDateAndTime": "2022-04-24T22:14:00.000Z",
                                "presence": "Present",
                                "_id": "626faf6450d67794b215a35b"
                            }
                        ],
                        "universityAttended": "626854bd32509c342d776b0a"
                    }
                ],
                "lecturesForSemester": [
                    {
                        "lectureForSemesterId": "62666ce532509c342d776af3",
                        "startDateAndTime": "2022-05-08T20:12:25.041Z",
                        "endDateAndTime": "2022-05-08T22:12:25.041Z"
                    },
                    {
                        "lectureForSemesterId": "62666f4a32509c342d776af5",
                        "startDateAndTime": "2022-05-10T10:30:00.000Z",
                        "endDateAndTime": "2022-05-10T12:00:00.000Z"
                    }
                ],
                "geolocationId": "6268574332509c342d776b0c",
                "lecturesForToday": []
            }
        ]
    }
]
generateCSV(teachersWithLecturesAndStudentsForToday);
