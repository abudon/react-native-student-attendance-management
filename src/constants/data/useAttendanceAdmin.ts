import { useEffect, useState } from "react";
import useUsers from "./useUsers";
import useAttendance from "./useAttendance";
import {IDailyAttendanceItem, IStudentReport, ITopAttendance} from "../types";
import {useAuth, useTheme} from "../../hooks";

const useAttendanceAdmin = () => {
    /////// VARIABLE INITIALIZATIONS //////////////
    const [totalStaffs, setTotalStaffs] = useState<number>();
    const [totalStudent, setTotalStudent] = useState<number>();
    const [staffPresent, setStaffPresent] = useState<number>();
    const [studentPresent, setStudentPresent] = useState<number>();
    const [topStaff, setTopStaff] = useState<ITopAttendance[]>([]);
    const [topStudent, setTopStudent] = useState<ITopAttendance[]>([]);
    const [attendanceDays, setAttendanceDays] = useState<number>(0);
    const [lateStaffNumber, setLateStaffNumber] = useState<number>(0);
    const [lateStudentNumber, setLateStudentNumber] = useState<number>(0);
    const [dailyAttendanceStaff, setDailyAttendanceStaff] = useState<IDailyAttendanceItem[]>([]);
    const [dailyAttendanceStudent, setDailyAttendanceStudent] = useState<IDailyAttendanceItem[]>([]);
    const [everydayAttendanceStaff, setEverydayAttendanceStaff] = useState<IDailyAttendanceItem[]>([]);
    const [everydayAttendanceStudent, setEverydayAttendanceStudent] = useState<IDailyAttendanceItem[]>([]);
    const [everyMonthStaff, setEveryMonthStaff] = useState<IDailyAttendanceItem[]>([]);
    const [everyMonthStudent, setEveryMonthStudent] = useState<IDailyAttendanceItem[]>([]);
    const [staffRecord, setStaffRecord] = useState<IStudentReport[]>([]);
    const { users } = useUsers();
    const { attendance } = useAttendance();
    const {colors} = useTheme()



    //////// ATTENDANCE DAYS COUNT ///////////////
    useEffect(() => {
        const calculateAttendanceDays = () => {
            const uniqueDates = new Set();
            attendance?.forEach((user) => {
                const datePart = user.time.split(" ").splice(1, 3).join(' ');
                uniqueDates.add(datePart);
            });
            setAttendanceDays(uniqueDates.size);
        };

        if (attendance) {
            calculateAttendanceDays();
        }
    }, [attendance]);

    //////// TOTAL NUMBER OF STAFFS AND STUDENT///////////////
    useEffect(() => {
        if (users) {
            const staffCount = users.filter(item => item.type === 'staff').length;
            const studentCount = users.filter(item => item.type === 'student').length;
            setTotalStaffs(staffCount);
            setTotalStudent(studentCount);
        }
    }, [users]);

    //////// TOTAL NUMBER CURRENT PRESENT STAFF AND STUDENT  ///////////////
    useEffect(() => {
        const getCurrentPresent = () => {
            const today = new Date();
            const formattedToday = today.toLocaleDateString('default', {
                day: "numeric",
                month: "short",
                year: "numeric"
            });

            const staffCount = attendance?.filter(user => {
                const attendTime = user.time.split(" ").splice(1, 3).join(" ");
                return formattedToday === attendTime &&
                    user.type === 'staff' &&
                    user.check.toLowerCase() === 'check-in';
            }).length;

            const studentCount = attendance?.filter(user => {
                const attendTime = user.time.split(" ").splice(1, 3).join(" ");
                return formattedToday === attendTime &&
                    user.type === 'student' &&
                    user.check.toLowerCase() === 'check-in';
            }).length;

            setStaffPresent(staffCount);
            setStudentPresent(studentCount);
        };

        if (attendance) {
            getCurrentPresent();
        }
    }, [attendance]);

    ///////// GETTING TOTAL NUMBER OF LATE COMING STAFF AND STUDENT  ////////////

    useEffect(() => {
        const getLateComers = () => {
            //DATE FOR TODAY
            const today = new Date();
            const formattedToday = today.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });

            const allLateStaff = attendance?.filter((attend) => {
                //STAFF DATES
                const attendanceDate = attend.time.split(" ").splice(1, 3).join(" ")
                //STAFF TIME
                const attendanceTime = attend.time.split(" ").splice(4).join(" ")
                const [hours, ] = attendanceTime.split(":");


                return attendanceDate === formattedToday &&
                    hours>='08' &&
                    hours <='10' &&
                    attend.type === 'staff'
            });


            const allLateStudent = attendance?.filter((attend) => {
                //STUDENT DATES
                const attendanceDate = attend.time.split(" ").splice(1, 3).join(" ")
                //STAFF TIME
                const attendanceTime = attend.time.split(" ").splice(4).join(" ")
                const [hours, ] = attendanceTime.split(":");


                return attendanceDate === formattedToday &&
                    hours>='08' &&
                    hours <='10' &&
                    attend.type === 'student'
            });

            if (allLateStaff && totalStaffs){
                setLateStaffNumber(allLateStaff?.length)
            }
            if (allLateStudent){
                setLateStudentNumber(allLateStudent.length)
            }
        };
        if (attendance){
            getLateComers()
        }
    }, [attendance]);


    //////// TOP STAFF AND STUDENT ATTENDANCE ///////////////
    useEffect(() => {
        const getTopAttendance = () => {
            const staffIDs = [
                ...new Set(
                    users.filter(item => item.type === 'staff').map(item => item.userid)
                )
            ];
            const staffCount = staffIDs.map(id => {
                const staffRecords = attendance?.filter(user =>
                    user.type === 'staff' &&
                    user.registrarId === id &&
                    user.check.toLowerCase() === 'check-in'
                );

                const staffRecordsFilter = staffRecords?.filter(item =>
                    item.registrarId !== undefined &&
                    item.type !== undefined &&
                    item.time !== undefined &&
                    item.check !== undefined
                );

                if (!staffRecordsFilter) return { id, name: '', value: 0 };

                const totalScore = staffRecordsFilter.reduce((acc, user) => {
                    const [hour, minute] = user.time.split(" ")[4].split(':').map(Number);
                    let calculations = 0;
                    if (hour < 7) {
                        calculations += (minute < 30) ? 4 : 3;
                    } else if (hour === 7) {
                        calculations += (minute < 30) ? 2 : 1;
                    }
                    return acc + calculations;
                }, 0);

                const attendanceScore = (staffRecordsFilter.length / (attendanceDays || 1));
                const averageScore = (totalScore / (4 * (attendanceDays || 1)));
                const finalScore = (averageScore + attendanceScore) * 100;

                const name = staffRecordsFilter.length > 0 ? staffRecordsFilter[0].name : '';

                return {
                    id,
                    name,
                    value: Math.ceil(finalScore || 0)
                };
            });

            const resolveStaff = staffCount.sort((a, b) => b.value - a.value).slice(0, 9);
            setTopStaff(resolveStaff);

            const studentIDs = [
                ...new Set(
                    users.filter(item => item.type === 'student').map(item => item.userid)
                )
            ];
            const studentCount = studentIDs.map(id => {
                const studentRecords = attendance?.filter(user =>
                    user.type === 'student' &&
                    user.registrarId === id &&
                    user.check.toLowerCase() === 'check-in'
                );

                const studentRecordsFilter = studentRecords?.filter(item =>
                    item.registrarId !== undefined &&
                    item.type !== undefined &&
                    item.time !== undefined &&
                    item.check !== undefined
                );

                if (!studentRecordsFilter) return { id, name: '', value: 0 };

                const totalScore = studentRecordsFilter.reduce((acc, user) => {
                    const [hour, minute] = user.time.split(" ")[4].split(':').map(Number);
                    let calculations = 0;
                    if (hour < 7) {
                        calculations += (minute < 30) ? 4 : 3;
                    } else if (hour === 7) {
                        calculations += (minute < 30) ? 2 : 1;
                    }
                    return acc + calculations;
                }, 0);

                const attendanceScore = ((studentRecordsFilter.length || 0) / (attendanceDays || 1));
                const averageScore = (totalScore / (4 * (attendanceDays || 1)));
                const finalScore = (averageScore + attendanceScore) * 100;
                const name = studentRecordsFilter.length > 0 ? studentRecordsFilter[0].name : '';
                const grade = users?.filter(item => item.userid === id)[0].grade;

                return {
                    id,
                    name,
                    value: Math.ceil(finalScore || 0),
                    grade: grade
                };
            });
            const resolveStudent = studentCount.sort((a, b) => b.value - a.value).slice(0, 10);
            setTopStudent(resolveStudent);
        };

        if (attendanceDays > 0 && users && attendance) {
            getTopAttendance();
        }
    }, [attendanceDays, users, attendance]);

    ///////// GETTING VALUES OF STAFF AND STUDENT FROM MON TO SAT FOR BAR CHART ////////////
    useEffect(() => {

        const getDailyAttendanceOFStaffAndStudent = () => {
            const dayOrder = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            const uniqueDays = [
                ...new Set(
                    attendance?.map((attend) => {
                        return attend.time.split(" ")[0];
                    })
                )
            ];

            uniqueDays.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));

            const month = new Date().toLocaleDateString("default", { month: 'short' });

            const staffCount = uniqueDays.map((day) => {
                const value = attendance?.filter((attend) => {
                    const [attendDay, , attendMonth] = attend.time.split(" ");
                    return day === attendDay &&
                        month === attendMonth &&
                        attend.type === 'staff' &&
                        attend.check.toLowerCase() === 'check-in' &&
                        users.some((user) => user.userid === attend.registrarId );
                });

                // Calculate logic
                let logic = 0
                if (value && totalStaffs){
                     logic = value.length/totalStaffs
                }

                let newValue = 0;

                for (let x = 1; x <= 4; x++) {
                    if (logic >= x - 1 && logic <= x) {
                        newValue = (logic / x) * 100;
                        break;
                    }
                }

                return {
                    value: newValue,
                    label: `${day.split('')[0]}`,
                    frontColor: (Math.ceil(Math.random() * 5) % 3 === 2 ? colors.success : colors.gray)
                };
            });

            const studentCount = uniqueDays.map((day) => {
                const value = attendance?.filter((attend) => {
                    const [attendDay, , attendMonth] = attend.time.split(" ");
                    return day === attendDay &&
                        month === attendMonth &&
                        attend.type === 'student' &&
                        attend.check.toLowerCase() === 'check-in' &&
                        users.some((user) => user.userid === attend.registrarId );
                });

                // Calculate logic
                let logic = 0
                if (value && totalStudent){
                    logic = value.length/totalStudent
                }

                let newValue = 0;

                for (let x = 1; x <= 4; x++) {
                    if (logic >= x - 1 && logic <= x) {
                        newValue = (logic / x) * 100;
                        break;
                    }
                }

                return {
                    value: newValue,
                    label: `${day.split('')[0]}`,
                    frontColor: (Math.ceil(Math.random() * 5) % 3 === 2 ? colors.success : colors.gray)
                };
            })

            // Filter out any incomplete objects
            const filteredStaffCount = staffCount.filter(item => item.value !== undefined && item.label !== undefined && item.frontColor !== undefined);
            const filteredStudentCount = studentCount.filter(item => item.value !== undefined && item.label !== undefined && item.frontColor !== undefined);
            setDailyAttendanceStaff(filteredStaffCount);
            setDailyAttendanceStudent(filteredStudentCount);
        };

        getDailyAttendanceOFStaffAndStudent()

    }, [attendance, totalStaffs]);

    ///////// GETTING VALUES OF EVERYDAY ATTENDANCE STATS FOR LINE CHART ////////////
    useEffect(() => {
        const getEverydayAttendance = () => {
            const uniqueDates = [...new Set(attendance?.map(user => {
                return  user.time.split(' ').slice(1, 4).join(' ');

            }))]

            const dailyAttender =uniqueDates.map((day) => {

                const  dailyValues = attendance?.filter((user)=>{
                    const datepart = user.time.split(' ').slice(1, 4).join(' ')
                    return day === datepart  &&
                        user.type === 'staff' &&
                        user.check === 'Check-In'

                }).length


                let newValue = 0
                if (dailyValues != undefined && totalStaffs) {
                    newValue = (dailyValues/totalStaffs)*100
                }

                return {
                    value: newValue,
                    label: `${day}`,
                };
            })

            const dailyAttenderStdent =uniqueDates.map((day) => {

                const  dailyValues = attendance?.filter((user)=>{
                    const datepart = user.time.split(' ').slice(1, 4).join(' ')
                    return day === datepart  &&
                        user.type === 'student' &&
                        user.check === 'Check-In'

                }).length


                let newValue = 0
                if (dailyValues != undefined && totalStudent) {
                    newValue = (dailyValues/totalStudent)*100
                }

                return {
                    value: newValue,
                    label: `${day}`,
                };
            })

            const filteredStaffCount = dailyAttender.filter(item => item.value !== undefined && item.label !== undefined);
            const filteredStudentCount = dailyAttenderStdent.filter(item => item.value !== undefined && item.label !== undefined);
            setEverydayAttendanceStaff(filteredStaffCount)
            setEverydayAttendanceStudent(filteredStudentCount)
        }

        getEverydayAttendance()

    }, [attendance, totalStaffs]);

    useEffect(() => {
        ///////// GETTING VALUES OF EVERY MONTH ATTENDANCE STATS FOR LINE CHART ////////////
        const getMonthlyAttendance = () => {
            const uniqueMonths = [...new Set(attendance?.map(user => {
                return  user.time.split(' ').slice(2, 4).join(' ');
            }))]

            const monthlyAttendeeStudent = uniqueMonths?.map(everyMonth => {
                const monthlyValues = attendance?.filter(attendee => {
                    const month = attendee?.time.split(' ').slice(2, 4).join(' ');
                    return everyMonth === month &&
                        attendee.type === 'student' &&
                        attendee.check === 'Check-In'
                }).length

                let newValue = 0
                if (monthlyValues != undefined){
                    newValue = 100*((monthlyValues )/26)
                }



                return {
                    value: newValue,
                    label: `${everyMonth}`,
                };

            })

            const monthlyAttendee = uniqueMonths?.map(everyMonth => {
                const monthlyValues = attendance?.filter(attendee => {
                    const month = attendee?.time.split(' ').slice(2, 4).join(' ');
                    return everyMonth === month &&
                        attendee.type === 'staff' &&
                        attendee.check === 'Check-In'
                }).length

                let newValue = 0
                if (monthlyValues != undefined){
                    newValue = 100*((monthlyValues )/26)
                }



                return {
                    value: newValue,
                    label: `${everyMonth}`,
                };

            })


            const filteredStaffCount = monthlyAttendee.filter(item => item.value !== undefined && item.label !== undefined );
            const filteredStudentCount = monthlyAttendeeStudent.filter(item => item.value !== undefined && item.label !== undefined);
            setEveryMonthStaff(filteredStaffCount)
            setEveryMonthStudent(filteredStudentCount)
        }
        getMonthlyAttendance()
    }, [attendance]);


    ///////// GETTING STUDENT RECORDS FOR EVERY DAY ////////////
    useEffect(() => {

        const getRecord = () => {
            const uniqueDates = [...new Set(attendance?.map(user => {
                return user.time.split(' ').slice(1, 4).join(' ');
            }))];


            const dailyAttender = uniqueDates.map((day) => {
                const dailyAttendant = attendance?.filter((user) => {
                    const datepart = user.time.split(' ').slice(1, 4).join(' ');
                    return day === datepart &&
                        user.type === 'staff' &&
                        users.some(person => {
                            return person.userid === user.registrarId;
                        });
                }) || []; // Ensure dailyAttendant is an array

                return {
                    title: day,
                    data: dailyAttendant.map(item => ({
                        key: item.Id,
                        name: item.name,
                        check: item.check as string, // Ensure type string
                        time: item.time as string // Ensure type string
                    }))
                };
            });



            const filterResult = dailyAttender.filter(item => item.title !== undefined && item.data !== undefined);
            setStaffRecord(filterResult.reverse() || []);
        };
        getRecord()
    }, [attendance]);






    return {
        totalStaffs,
        totalStudent,
        staffPresent,
        studentPresent,
        topStaff,
        topStudent,
        lateStaffNumber,
        dailyAttendanceStaff,
        dailyAttendanceStudent,
        everydayAttendanceStaff,
        everydayAttendanceStudent,
        everyMonthStaff,
        everyMonthStudent,
        lateStudentNumber,
        staffRecord
    };
};

export default useAttendanceAdmin;
