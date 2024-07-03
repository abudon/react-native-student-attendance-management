import {onValue, ref} from "firebase/database";
import {database} from "../../utils/firebaseConfig";
import {useEffect, useState} from "react";
import {IAttendance, IDailyAttendanceItem, IFIreBaseUsers, ILogIn, IStudentReport} from "../types";
import {useAuth, useTheme} from "../../hooks";
import useUsers from "./useUsers";
import {ColorValue} from "react-native";


export default () => {


    const [staffProfile, setStaffProfile] = useState<IFIreBaseUsers>();
    const [attendance, setAttendance] = useState<IAttendance[]>();
    const [attendanceDays, setAttendanceDays] = useState(0);
    const [attendanceDateByStudent, setAttendanceDateByStudent] = useState<number>(0);
    const [totalStudentByGrade, setTotalStudentByGrade] = useState<number>(0);
    const [presentStudentsByGradeToday, setPresentStudentsByGradeToday] = useState<number>(0);
    const [presentStudentsLateByGradeToday, setPresentStudentsLateByGradeToday] = useState<number>(0);
    const [dailyAttendancebyGrade, setDailyAttendancebyGrade] = useState<IDailyAttendanceItem[]>([]);
    const [dailyCalculation, setDailyCalculation] = useState<IDailyAttendanceItem[]>();
    const [monthlyCalculation, setMonthlyCalculation] = useState<IDailyAttendanceItem[]>([]);
    const [studentRecordByDate, setStudentRecordByDate] = useState<IStudentReport[]>([]);
    const user = useAuth();
    const {colors} = useTheme()
    const {users} = useUsers()





    // GETTING ATTENDANCES FROM THE DATABASE AT REAL TIME
    const getAttendance = async () => {
        const databaseReference = ref(database,'notifications/')
        onValue(databaseReference, (snapshot)=>{
            if (snapshot.exists()){
                const data = snapshot.val()
                const transformedData : IAttendance[] = [];
                for (const key in data){
                    if(data.hasOwnProperty(key)){
                        const item = data[key];
                        const dateObj = new Date(item.time);

                        const day = dateObj.toLocaleString('default', { weekday: 'short' });
                        const date = dateObj.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });
                        const time = dateObj.toLocaleTimeString('default', { hour: '2-digit', minute: '2-digit' });

                        const transformedItem = {
                            Id: key,
                            registrarId: item.registrarId,
                            name: item.name,
                            type: item.type,
                            time: `${day} ${date} ${time}`,
                            check: item.check,
                            contact: item.contact,
                        }

                        transformedData.push(transformedItem);
                    }
                }
                setAttendance(transformedData)
            }
        })
    }
    ///////// TOTAL ATTENDANCE DAYS////////////

    const getTotalAttendanceDays = () => {
        const uniqueDates = new Set()
        attendance?.forEach((user)=>{
            const datePart = user.time.split(" ").splice(1, 3).join(' ')
            uniqueDates.add(datePart)
            setAttendanceDays(uniqueDates.size)
        })
    }


    ///////// TOTAL ATTENDANCE DAYS BY THE CURRENT USERS////////////

    const getAttendanceDatesByUsers = (users:ILogIn) =>{
        const attendanceStudent = attendance?.filter((attend)=>(
            attend.registrarId.toLowerCase() === users.userid
        ))
        const uniqueDate = new Set()

        attendanceStudent?.forEach((user)=>{
            const datePart = user.time.split(" ").splice(1, 3).join(' ')
            uniqueDate.add(datePart)
            setAttendanceDateByStudent(uniqueDate.size)
        })
    }


    ///////// TEACHER'S APP ANALYSIS ////////////

    ///////// GETTING TEACHERS PROFILE////////////
    useEffect(() => {
        const staffID = user.userid.toUpperCase();
        setStaffProfile(users.find((user)=>user.userid === staffID ))
    }, [users]);

    ///////// GETTING TOTAL NUMBER STUDENT BY GRADE OF TEACHER ////////////
    const getTotalStudentByGrade = () => {

        if (staffProfile) {
            const allStudentUnderStaff = users.filter(
                (user) => user.type === 'student' && user.grade === staffProfile.grade
            );
            setTotalStudentByGrade(allStudentUnderStaff.length);
        } else {

        }
    };

    ///////// GETTING TOTAL NUMBER PRESENT STUDENT BY GRADE OF TEACHER ////////////
    const  getTotalStudentPresentByGrade = () => {

        if (!staffProfile) return;
        const today = new Date().toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });
        const allPresentStudents = attendance?.filter((attend) => {
            const datePart = attend.time.split(" ").splice(1, 3).join(' ');
            return  datePart === today &&
                        attend.check.toLowerCase() === 'check-in' &&
                users.find(user => user.userid === attend.registrarId &&
                    user.grade === staffProfile.grade);
        });

        setPresentStudentsByGradeToday(allPresentStudents?.length || 0);
    }

    ///////// GETTING TOTAL NUMBER OF LATE COMING STUDENTS BY GRADE OF TEACHER ////////////
    const getTotalStudentLatePresentByGrade = () => {
        if (!staffProfile) return;
        //DATE FOR TODAY
        const today = new Date();
        const formattedToday = today.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });

        const allLateStudents = attendance?.filter((attend) => {
            //STUDENT DATES
            const attendanceDate = attend.time.split(" ").splice(1, 3).join(" ")
            //STUDENT TIME
            const attendanceTime = attend.time.split(" ").splice(4).join(" ")
            const [hours, minute] = attendanceTime.split(":");


            return attendanceDate === formattedToday &&
                hours>='08' &&
                hours <='10' &&
                users.find(user => user.userid === attend.registrarId &&
                    user.grade === staffProfile.grade);
        });
        setPresentStudentsLateByGradeToday(allLateStudents?.length || 0);
    };

    // ///////// GETTING TOTAL NUMBER OF ABSENT STUDENTS BY GRADE OF TEACHER ////////////
    // const getAbsentStudent = () =>{
    //     if (!staffProfile) return;
    //     const date = new Date;
    //     const todayDate = date.toLocaleDateString('default', { month: 'short', day: 'numeric', year: 'numeric' });
    //     const absentStudent = attendance?.filter((attend)=>{
    //         const attenderDate = attend.time.split(" ").splice(1, 3).join(" ");
    //
    //         return todayDate === attenderDate &&
    //             users.find((user)=>{
    //                 return user.userid !== attend.registrarId &&
    //                     user.grade === staffProfile.grade
    //             })
    //     })
    //
    //     setAbsentStudentByGrade(absentStudent?.length != 0 ? (absentStudent?.length ?? 0) : totalStudentByGrade)
    // }

    ///////// GETTING VALUES OF STUDENT FROM MON TO SAT FOR BAR CHART ////////////
    const getDailyAttendanceByGrade = () => {
        const dayOrder = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // Array representing the order of the days

        const uniqueDays = [
            ...new Set(
                attendance?.map((attend) => {
                    return attend.time.split(" ")[0]; // Get day part from time
                })
            )
        ];

        // Sort uniqueDays based on the dayOrder array
        uniqueDays.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));

        const month = new Date().toLocaleDateString("default", { month: 'short' });

        const studentCount = uniqueDays.map((day) => {
            const value = attendance?.filter((attend) => {
                const [attendDay, , attendMonth] = attend.time.split(" "); // Destructure day, month
                return day === attendDay &&
                    month === attendMonth &&
                    users.some((user) => user.userid === attend.registrarId &&
                        user.grade === staffProfile?.grade);
            });

            // Calculate logic
            const logic = (value?.length || 0) / (totalStudentByGrade || 1);

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

        // Filter out any incomplete objects
        const filteredStudentCount = studentCount.filter(item => item.value !== undefined && item.label !== undefined && item.frontColor !== undefined);
        setDailyAttendancebyGrade(filteredStudentCount);
    };

    ///////// GETTING VALUES OF EVERYDAY ATTENDANCE STATS FOR LINE CHART ////////////
    const calculateDailyAttendance = () => {
        const uniqueDates = [...new Set(attendance?.map(user => {
            return  user.time.split(' ').slice(1, 4).join(' ');

        }))]

        if (!staffProfile) return;
        const dailyAttender =uniqueDates.map((day) => {

            const  dailyValues = attendance?.filter((user)=>{
                const datepart = user.time.split(' ').slice(1, 4).join(' ')
                return day === datepart  &&
                    user.type === 'student' &&
                    user.check === 'Check-In' &&
                    users.some(person=> {
                        return  person.userid === user.registrarId &&
                            person.grade === staffProfile.grade})
            }).length

            console.log(dailyValues)
            const newValue = ((dailyValues || 0) / (totalStudentByGrade || 1) )*100;

            return {
                value: newValue,
                label: `${day}`,
                frontColor: (Math.ceil(Math.random() * 5) % 3 === 2 ? colors.success : colors.gray)  // Ensure fontColor is of type ColorValue
            };
        })
        const filteredStudentCount = dailyAttender.filter(item => item.value !== undefined && item.label !== undefined && item.frontColor !== undefined);
        console.log(filteredStudentCount)
        setDailyCalculation(filteredStudentCount)
    }

    ///////// GETTING VALUES OF EVERY MONTH ATTENDANCE STATS FOR LINE CHART ////////////
    const calculateMonthlyAttendance = () => {
        const uniqueMonths = [...new Set(attendance?.map(user => {
            return  user.time.split(' ').slice(2, 4).join(' ');

        }))]

        if (!staffProfile) return;
        const monthlyAttendee = uniqueMonths?.map(everyMonth => {
            const monthlyValues = attendance?.filter(attendee => {
                const month = attendee?.time.split(' ').slice(2, 4).join(' ');
                return everyMonth === month &&
                    attendee.type === 'student' &&
                    attendee.check === 'Check-In' &&
                    users.some(person=> {
                        return  person.userid === attendee.registrarId &&
                            person.grade === staffProfile.grade})

            }).length

            const newValue = 100*((monthlyValues || 0)/26)

            return {
                value: newValue || 0,
                label: `${everyMonth}`,
                frontColor: (Math.ceil(Math.random() * 5) % 3 === 2 ? colors.success : colors.gray)  // Ensure fontColor is of type ColorValue
            };

        })

        const filteredStudentCount = monthlyAttendee.filter(item => item.value !== undefined && item.label !== undefined && item.frontColor !== undefined);
        console.log(filteredStudentCount)
        setMonthlyCalculation(filteredStudentCount)
    }

    ///////// GETTING STUDENT RECORDS FOR EVERY DAY ////////////
    const getStudentRecordByGrade = () => {
        const uniqueDates = [...new Set(attendance?.map(user => {
            return user.time.split(' ').slice(1, 4).join(' ');
        }))];

        if (!staffProfile) return;

        const dailyAttender = uniqueDates.map((day) => {
            const dailyAttendant = attendance?.filter((user) => {
                const datepart = user.time.split(' ').slice(1, 4).join(' ');
                return day === datepart &&
                    user.type === 'student' &&
                    users.some(person => {
                        return person.userid === user.registrarId &&
                            person.grade === staffProfile.grade;
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
        setStudentRecordByDate(filterResult.reverse() || []);
    };





    ////////// CALL FOR GET ATTENDANCE EVERY RENDERING ///////////
    useEffect(() => {
        getAttendance().then(()=>console.log("success in getting attendance"))
    }, []);


    ////////// CALL FOR GET ALL FUNCTIONS EVERY SPECIFIC RENDERING ///////////
    useEffect(() => {

        getTotalAttendanceDays()
        getAttendanceDatesByUsers(user)
        getTotalStudentByGrade()
        getTotalStudentPresentByGrade()
        getTotalStudentLatePresentByGrade()
        getDailyAttendanceByGrade()
        calculateDailyAttendance()
        calculateMonthlyAttendance()
        getStudentRecordByGrade();

    }, [attendance, staffProfile, users]);






    return {
        attendance,
        attendanceDays,
        attendanceDateByStudent,
        totalStudentByGrade,
        presentStudentsByGradeToday,
        presentStudentsLateByGradeToday,
        dailyAttendancebyGrade,
        dailyCalculation,
        monthlyCalculation,
        studentRecordByDate

    }

}
