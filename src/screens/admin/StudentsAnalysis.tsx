import {Blocks, Divider, Images, Text} from "../../components";
import {bgcolors} from "../../constants";
import { BarChart, LineChart, PieChart} from "react-native-gifted-charts"
import {useEffect, useState} from "react";
import {RadioButton} from "react-native-paper";
import {useTheme} from "../../hooks";
import {IDailyAttendanceItem, IPieData} from "../../constants/types";
import {useAttendanceAdmin} from "../../constants/data";

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
    const [monthlyStaff, setMonthlyStaff] = useState<IDailyAttendanceItem[]>([]);


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
        if (everydayAttendanceStudent){
            setCurrentChoice(everydayAttendanceStudent)
        }
    }, [everydayAttendanceStudent]);

    useEffect(() => {

        if (everyMonthStudent){
            setMonthlyStaff(everyMonthStudent)
        }
    }, [everyMonthStudent, everydayAttendanceStudent]);



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
                            >
                                <Text
                                    marginBottom={30}
                                    h5
                                    black
                                >Time Attendance:</Text>
                                <PieChart
                                    data={pieChartData}
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
                                    data={barData}
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
                                    setCurrentChoice(choice == 'daily'? everydayAttendanceStudent : monthlyStaff)
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

export default StudentsAnalysis
