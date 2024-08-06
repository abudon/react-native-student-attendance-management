import {Blocks, Divider, Images, Text} from "../../components";
import {bgcolors} from "../../constants";
import {useEffect, useState} from "react";
import {useTheme} from "../../hooks";
import {IDailyAttendanceItem, IPieData} from "../../constants/types";
import {useAttendanceAdmin} from "../../constants/data";
import PieChartDiagram from "../../examples/PieChart";
import LineChartDiagram from "../../examples/LineChart";
import BarChartDiagram from "../../examples/BarChart";

const StudentsAnalysis = () => {
    const {sizes, colors, } = useTheme()
    const [choice, setChoice] = useState<string>('daily');
    const initialPieData  = [
        {value: 33, color: '#177AD5', text:'33%'},
        {value: 33, color: '#79D2DE', text:'33%'},
        {value: 33, color: '#E23F11', text:'33%'},
    ];
    const [pieChartData, setPieChartData] = useState<IPieData[]>(initialPieData);

    const initialBarData = [
        {value: 0, label: 'M'},
        {value: 0, label: 'T', frontColor: colors.success},
        {value: 0, label: 'W', frontColor: colors.success},
        {value: 0, label: 'T'},
        {value: 0, label: 'F', frontColor: colors.success},
        {value: 0, label: 'S'},
        {value: 0, label: 'S', frontColor: colors.success},
    ];
    const [barData, setBarData] = useState<IDailyAttendanceItem[]>(initialBarData);

    const initialLineData = [
        {value: 0, label: 'Jan'},
        {value: 0, label: 'Feb', frontColor: colors.success},
        {value: 0, label: 'Mar', frontColor: colors.success},
        {value: 0, label: 'Apr'},
        {value: 0, label: 'May', frontColor: colors.success},
        {value: 0, label: 'Jun'},
        {value: 0, label: 'Jul', frontColor: colors.success},
        {value: 0, label: 'Aug', frontColor: colors.success},
        {value: 0, label: 'Sep'},
        {value: 0, label: 'Oct', frontColor: colors.success},
        {value: 0, label: 'Nov'},
        {value: 0, label: 'Dec', frontColor: colors.success},

    ]


    const [currentChoice, setCurrentChoice] = useState<IDailyAttendanceItem[]>(initialLineData);
    const [monthlyStaff, setMonthlyStaff] = useState<IDailyAttendanceItem[]>(initialLineData);


    const {studentPresent,
        totalStudent,
        lateStudentNumber,
        dailyAttendanceStudent,
        everydayAttendanceStudent,
        everyMonthStudent
    } = useAttendanceAdmin()

    useEffect(() => {
        console.log(studentPresent, totalStudent, lateStudentNumber)
        if (totalStudent != undefined && studentPresent != undefined){
            const late = lateStudentNumber/(totalStudent )*100
            const absent = ((totalStudent - studentPresent)/totalStudent)*100
            if (lateStudentNumber === 0 && studentPresent === 0){
                const ontime = 0
                const finalPieData  = [
                    {value: ontime, color: '#177AD5', text:`${ontime}%`},
                    {value: late, color: '#79D2DE', text:`${late}%`},
                    {value: absent, color: '#E23F11', text:`${absent}%`},
                ];
                setPieChartData(finalPieData)
            } else {
                const ontime = ((studentPresent - lateStudentNumber)/totalStudent)*100
                const finalPieData  = [
                    {value: ontime, color: '#177AD5', text:`${ontime}%`},
                    {value: late, color: '#79D2DE', text:`${late}%`},
                    {value: absent, color: '#E23F11', text:`${absent}%`},
                ];
                setPieChartData(finalPieData)
            }
        }


    }, [totalStudent, lateStudentNumber, studentPresent]);


    useEffect(() => {
        if (dailyAttendanceStudent){
            setBarData(dailyAttendanceStudent)
        }
    }, [dailyAttendanceStudent]);

    useEffect(() => {
        if (everydayAttendanceStudent && everyMonthStudent) {
            setMonthlyStaff(everyMonthStudent);
            setCurrentChoice(everydayAttendanceStudent);
        }
    }, [everydayAttendanceStudent, everyMonthStudent]);


    return(
        <Blocks
            style={{ width: '100%', height: "100%" }}
            gradient={bgcolors}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0.3 }}
        >
            <Blocks
                blur
                intensity={60}
                tint={'light'}
                flex={1}
                align={'center'}
                justify={"center"}
                style={{ height: "100%", width: "100%" }}
            >
                <Blocks
                    safe
                    style={{ height: "100%", width: "100%", flex: 1, flexDirection: "column", alignItems: 'center', justifyContent: 'center' }}
                >
                    <Blocks
                        scroll
                        style={{ width: "100%", height: "100%", padding: 20 }}
                    >
                        <PieChartDiagram pieChartData={pieChartData} />

                        <Divider/>

                        <BarChartDiagram barChartData={barData} />

                        <Divider/>
                        <LineChartDiagram data1={currentChoice} data2={monthlyStaff}/>
                        <Divider/>
                    </Blocks>
                </Blocks>
            </Blocks>
        </Blocks>
    )
}

export default StudentsAnalysis
