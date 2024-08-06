import {Blocks,Divider} from "../../components";
import {bgcolors} from "../../constants";
import { useEffect, useState} from "react";
import {useAttendance} from "../../constants/data";
import {IDailyAttendanceItem} from "../../constants/types";
import PieChartDiagram from "../../examples/PieChart";
import BarChartDiagram from "../../examples/BarChart";
import LineChartDiagram from "../../examples/LineChart";

const Analytics = () => {

    const {  totalStudentByGrade,
                presentStudentsLateByGradeToday,
                presentStudentsByGradeToday,
                dailyAttendancebyGrade,
                dailyCalculation,
                monthlyCalculation
            } = useAttendance()
    const barChartSample = [
        { value: 0, label: 'Jan' },
        { value: 0, label: 'Feb' },
        { value: 0, label: 'Mar' },
        { value: 0, label: 'Apr' },
        { value: 0, label: 'May' },
        { value: 0, label: 'Jun' },
        { value: 0, label: 'Jul' },
        { value: 0, label: 'Aug' },
        { value: 0, label: 'Sep' },
        { value: 0, label: 'Oct' },
        { value: 0, label: 'Nov' },
        { value: 0, label: 'Dec' },
    ];


    const [currentChoice, setCurrentChoice] = useState<IDailyAttendanceItem[]>(dailyCalculation || barChartSample);
    const [ontimePercent, setOntimePercent] = useState<number>(0);
    const [latePercent, setLatePercent] = useState<number>(0);
    const [absentPercent, setAbsentPercent] = useState<number>(0);
    const [dailyAttendance, setDailyAttendance] = useState<IDailyAttendanceItem[]>(barChartSample);
    const [dailySetCalculation, setDailySetCalculation] = useState<IDailyAttendanceItem[]>(barChartSample);
    const [monthlySetCalculation, setMonthlySetCalculation] = useState<IDailyAttendanceItem[]>(barChartSample);
    const [choice, setChoice] = useState<string>('daily');

    useEffect(() => {
        const calculateOntime = ((totalStudentByGrade - (totalStudentByGrade - presentStudentsByGradeToday + presentStudentsLateByGradeToday ))/totalStudentByGrade)*100
        setOntimePercent(calculateOntime)
        setLatePercent((presentStudentsLateByGradeToday / totalStudentByGrade) * 100)
        setAbsentPercent( ((totalStudentByGrade - presentStudentsByGradeToday) / totalStudentByGrade) * 100)
        setDailyAttendance(dailyAttendancebyGrade)
        setDailySetCalculation(dailyCalculation || barChartSample)
        setMonthlySetCalculation( monthlyCalculation || barChartSample)
    }, [presentStudentsByGradeToday, totalStudentByGrade, presentStudentsLateByGradeToday, setAbsentPercent, dailyAttendance,
                    setDailyAttendance, setDailySetCalculation, setMonthlySetCalculation]);





    const pieData = [
        {value: ontimePercent, color: '#177AD5', text: `${ontimePercent.toFixed(1)}%`},
        {value: latePercent, color: '#79D2DE', text: `${latePercent.toFixed(1)}%`},
        {value: absentPercent, color: '#E23F11', text: `${absentPercent.toFixed(1)}%`},
    ];









    return(
        <Blocks
            style={{
                width: '100%',
                height: "100%"
            }}
            gradient={bgcolors}
            start={{
                x:1,
                y: 0
            }}
            end={{x:0, y:0.3}}
        >
            <Blocks
                blur
                intensity={60}
                tint={'light'}
                flex={1}
                align={'center'}
                justify={"center"}
                style={{
                    height: "100%",
                    width: "100%"
                }}
            >
                <Blocks
                    safe
                    style={{
                        height: "100%",
                        width: "100%",
                        flex: 1,
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Blocks
                        scroll
                        style={{
                            width: "100%",
                            height: "100%",
                            padding: 20

                        }}
                    >

                        <PieChartDiagram pieChartData={pieData} />
                        <Divider/>


                        <BarChartDiagram barChartData={dailyAttendance} />
                        <Divider/>

                        <LineChartDiagram data1={dailySetCalculation} data2={monthlyCalculation}/>

                        <Divider/>


                    </Blocks>
                </Blocks>
            </Blocks>
        </Blocks>
    )
}

export default Analytics
