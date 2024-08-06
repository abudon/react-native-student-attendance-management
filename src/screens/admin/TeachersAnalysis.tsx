import {Blocks, Divider, Images, Text} from "../../components";
import {bgcolors} from "../../constants";
import { useEffect, useState } from "react";
import { RadioButton } from "react-native-paper";
import { useTheme } from "../../hooks";
import { useAttendanceAdmin } from "../../constants/data";
import { IDailyAttendanceItem, IPieData } from "../../constants/types";
import PieChartDiagram from "../../examples/PieChart";
import BarChart from "../../examples/BarChart";
import LineChartDiagram from "../../examples/LineChart";
import BarChartDiagram from "../../examples/BarChart";

const TeachersAnalysis = () => {
    const { colors } = useTheme();
    const initialPieData  = [
        { value: 33, color: '#177AD5', text: '33%' },
        { value: 33, color: '#79D2DE', text: '33%' },
        { value: 33, color: '#E23F11', text: '33%' },
    ];
    const [pieChartData, setPieChartData] = useState<IPieData[]>(initialPieData);

    const initialBarData = [
        { value: 0, label: 'M' },
        { value: 0, label: 'T', frontColor: colors.success },
        { value: 0, label: 'W', frontColor: colors.success },
        { value: 0, label: 'T' },
        { value: 0, label: 'F', frontColor: colors.success },
        { value: 0, label: 'S' },
        { value: 0, label: 'S', frontColor: colors.success },
    ];
    const [barData, setBarData] = useState<IDailyAttendanceItem[]>(initialBarData);

    const initialLineData = [
        { value: 100, label: 'Jan' },
        { value: 100, label: 'Feb', frontColor: colors.success },
        { value: 100, label: 'Mar', frontColor: colors.success },
        { value: 100, label: 'Apr' },
        { value: 100, label: 'May', frontColor: colors.success },
        { value: 100, label: 'Jun' },
        { value: 100, label: 'Jul', frontColor: colors.success },
        { value: 100, label: 'Aug', frontColor: colors.success },
        { value: 100, label: 'Sep' },
        { value: 100, label: 'Oct', frontColor: colors.success },
        { value: 100, label: 'Nov' },
        { value: 100, label: 'Dec', frontColor: colors.success },
    ];

    const [currentChoice, setCurrentChoice] = useState<IDailyAttendanceItem[]>([]);
    const [monthlyStaff, setMonthlyStaff] = useState<IDailyAttendanceItem[]>([]);

    const {
        staffPresent,
        totalStaffs,
        lateStaffNumber,
        dailyAttendanceStaff,
        everydayAttendanceStaff,
        everyMonthStaff
    } = useAttendanceAdmin();

    useEffect(() => {
        if (totalStaffs !== undefined && staffPresent !== undefined) {
            const late = (lateStaffNumber / totalStaffs) * 100;
            const absent = ((totalStaffs - staffPresent) / totalStaffs) * 100;
            const ontime = lateStaffNumber === 0 && staffPresent === 0
                ? 0
                : ((staffPresent - lateStaffNumber) / totalStaffs) * 100;
            const finalPieData  = [
                { value: ontime, color: '#177AD5', text: `${ontime}%` },
                { value: late, color: '#79D2DE', text: `${late}%` },
                { value: absent, color: '#E23F11', text: `${absent}%` },
            ];
            setPieChartData(finalPieData);
        }
    }, [totalStaffs, lateStaffNumber, staffPresent]);

    useEffect(() => {
        if (dailyAttendanceStaff) {
            setBarData(dailyAttendanceStaff);
        }
    }, [dailyAttendanceStaff]);

    useEffect(() => {
        if (everydayAttendanceStaff && everyMonthStaff) {
            setMonthlyStaff(everyMonthStaff);
            setCurrentChoice(everydayAttendanceStaff);
        }
    }, [everydayAttendanceStaff, everyMonthStaff]);



    return (
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
    );
}

export default TeachersAnalysis;
