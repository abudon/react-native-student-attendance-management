import {useEffect, useState} from "react";
import useAttendance from "./useAttendance";
import {IStudentReport} from "../types";
import useUsers from "./useUsers";


const useClassList = (grade: string) => {

    const [studentRecord, setStudentRecord] = useState<IStudentReport[]>([]);
    const { attendance } = useAttendance();
    const { users } = useUsers();

    useEffect(() => {
        const getRecord = () => {
            const uniqueDates = [...new Set(attendance?.map(user => {
                return user.time.split(' ').slice(1, 4).join(' ');
            }))];


            const dailyAttenderStudent = uniqueDates.map((day) => {
                const dailyAttendantStudent = attendance?.filter((user) => {
                    const datepart = user.time.split(' ').slice(1, 4).join(' ');
                    return day === datepart &&
                        user.type === 'student' &&
                        users.some(person => {
                            return person.userid === user.registrarId &&
                                person.grade.toLowerCase() === grade
                        });
                }) || [];

                return {
                    title: day,
                    data: dailyAttendantStudent.map(item => ({
                        key: item.Id,
                        name: item.name,
                        check: item.check as string,
                        time: item.time as string
                    }))
                };
            });


            const filterResultStudent = dailyAttenderStudent.filter(item => item.title !== undefined && item.data !== undefined);
            setStudentRecord(filterResultStudent.reverse() || []);
        };
        getRecord()
    }, [attendance, users]);

    return {

        studentRecord
    }
}
export default useClassList


