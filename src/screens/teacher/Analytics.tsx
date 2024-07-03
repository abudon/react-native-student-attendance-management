import {Blocks, Buttons, Divider, Images, Text} from "../../components";
import {bgcolors} from "../../constants";
import { BarChart, LineChart, PieChart} from "react-native-gifted-charts"
import {useCallback, useEffect, useState} from "react";
import {RadioButton} from "react-native-paper";
import {useAttendance} from "../../constants/data";
import {IDailyAttendanceItem} from "../../constants/types";
import * as child_process from "child_process";

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
        {value: latePercent, color: '#79D2DE', text: `${latePercent.toFixed(1)}%`},
        {value: absentPercent, color: '#E23F11', text: `${absentPercent.toFixed(1)}%`},
        {value: ontimePercent, color: '#177AD5', text: `${ontimePercent.toFixed(1)}%`}
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

                        <Blocks
                            shadow
                            white
                            card
                            style={{
                                width: "100%",
                                flex: 1,
                                flexDirection: 'column'
                            }}
                        >
                            <Blocks
                                width={'100%'}
                                padding={10}
                                marginBottom={10}
                                paddingTop={30}
                                flex={1}
                                align={"center"}
                            >
                                <Blocks
                                width={"100%"}
                                >
                                    <Text
                                        marginBottom={30}
                                        h5
                                        black
                                    >Time Attendance:</Text>
                                </Blocks>

                                <PieChart
                                    data={pieData}
                                    showText
                                    textColor="black"
                                    radius={100}
                                    textSize={15}
                                    focusOnPress
                                    showValuesAsLabels
                                    showTextBackground
                                    textBackgroundRadius={20}
                                />
                                <Blocks
                                    marginTop={10}
                                    justify={'center'}
                                    align={'center'}
                                    row
                                    flex={1}
                                    width={"100%"}
                                >
                                <Blocks
                                    style={{
                                        display: 'flex',
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width:"100%"
                                }}
                                >
                                   <Blocks style={{
                                       borderColor: '#79D2DE',
                                       borderWidth: 3,
                                       borderStyle: 'solid',
                                       borderRadius: 3
                                   }}></Blocks>
                                    <Text>late</Text>
                                </Blocks>

                                    <Blocks
                                        style={{
                                            display: 'flex',
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width:"100%"
                                        }}
                                    >
                                        <Blocks style={{
                                            borderWidth: 3,
                                            borderStyle: 'solid',
                                            borderRadius: 3,
                                            borderColor: '#177AD5'
                                        }}></Blocks>
                                        <Text>on time</Text>
                                    </Blocks>

                                    <Blocks
                                        style={{
                                            display: 'flex',
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width:"100%"
                                        }}
                                    >
                                        <Blocks style={{
                                            borderWidth: 3,
                                            borderStyle: 'solid',
                                            borderRadius: 3,
                                            borderColor: '#E23F11'
                                        }}></Blocks>
                                        <Text>absent</Text>
                                    </Blocks>


                                </Blocks>
                            </Blocks>


                        </Blocks>
                        <Divider/>


                        <Blocks
                            shadow
                            white
                            card
                            style={{
                                width: "100%",
                                flex: 1,
                                flexDirection: 'column'
                            }}
                        >
                            <Blocks
                                width={'100%'}
                                padding={10}
                                marginBottom={10}
                                paddingTop={30}
                            >
                              <Text
                                  marginBottom={30}
                                  h5
                                  black
                              >Weekly Report:</Text>
                                <BarChart
                                    barWidth={8}
                                    noOfSections={3}
                                    barBorderRadius={3}
                                    frontColor="lightgray"
                                    data={dailyAttendance}
                                    yAxisThickness={0}
                                    xAxisThickness={0}
                                />
                            </Blocks>


                        </Blocks>
                        <Divider/>

                        <Blocks
                            shadow
                            white
                            card
                            style={{
                                width: "100%",
                                flex: 1,
                                flexDirection: 'column'
                            }}
                        >
                            <Blocks
                                width={'100%'}
                                padding={10}
                                marginBottom={10}
                                paddingTop={30}
                            >
                                <Text
                                    marginBottom={30}
                                    h5
                                    black
                                >Attendance Comparison Chart:</Text>

                                        <RadioButton.Group onValueChange={(value)=>{
                                            setChoice(value)
                                            setCurrentChoice(choice=='daily'? dailySetCalculation : monthlyCalculation)
                                        }} value={choice}>
                                            <Blocks
                                                width={"100%"}
                                                row
                                                align={'center'}
                                                justify={'center'}
                                                paddingHorizontal={10}
                                                marginVertical={10}
                                                flex={1}>


                                            <Blocks flex={1} row align={'center'}>
                                                <RadioButton value="daily" />
                                                <Text p bold gray>Daily</Text>
                                            </Blocks>

                                            <Blocks flex={1} row align={'center'}>
                                                <RadioButton value="monthly" />
                                                <Text p bold  gray>Monthly</Text>
                                            </Blocks>

                                            </Blocks>

                                        </RadioButton.Group>


                             <LineChart
                                 areaChart
                                 startFillColor="#135f32"
                                 startOpacity={0.3}
                                 endFillColor='#135f32'
                                 endOpacity={0.1}
                                 curved
                                 data={currentChoice}
                                 yAxisThickness={0}
                                 xAxisThickness={0}
                             ></LineChart>
                            </Blocks>

                        </Blocks>

                        <Divider/>


                    </Blocks>
                </Blocks>
            </Blocks>
        </Blocks>
    )
}

export default Analytics
