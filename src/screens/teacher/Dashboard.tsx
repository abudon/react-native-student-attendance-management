import {Blocks, Divider, Images, Text} from "../../components";
import {bgcolors} from "../../constants";
import moment from "moment/moment";
import {FontAwesome5, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {AuthContext, useTheme} from "../../hooks";
import {useContext, useEffect, useState} from "react";
import { DateSelectionCalendar, DefaultTheme, Theme } from 'react-native-easy-calendar';
import English from 'dayjs/locale/en';
import {useAttendance, useUsers} from "../../constants/data";


const Dashboard = () => {

    const { sizes, colors} = useTheme()
    const [currentTime, setCurrentTime] = useState(moment().format('LTS'));
    const [greetingIcon, setGreetingIcon] = useState(require('../../assets/images/new/morning_icon.png'));
    const getHour = new Date().getHours()
    const currentDate = moment().format('YYYY-MM-DD');
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const {totalStudentByGrade, presentStudentsByGradeToday, presentStudentsLateByGradeToday} = useAttendance()


    const CustomTheme: Theme = {
        ...DefaultTheme,
        extraDayText: {
            color: 'orange',
        },
        selectedDayContainer: {
            backgroundColor: colors.success,
            borderRadius: 50
        }
    };






    useEffect(() => {
        const greetingPix = () => {
            const icon =
                (getHour >= 13 && getHour < 16)? require('../../assets/images/new/afternoon_icon.png'):
                    (getHour >=16)? require('../../assets/images/new/evening_icon.png'):require('../../assets/images/new/morning_icon.png')
            setGreetingIcon(icon)
        }
        greetingPix()
    }, [setGreetingIcon, getHour]);


    useEffect(() => {
        const interval = setInterval(()=>{
            setCurrentTime(moment().format('LTS'))
        },1000)

        return () => clearInterval(interval)
    }, []);




    return (
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
                                flex={1}
                                row
                                align='center'
                                justify={'space-around'}
                                wrap={'wrap'}
                                padding={10}
                                marginBottom={10}
                            >
                                <Images
                                    radius={50}
                                    height={60}
                                    width={60}
                                    marginRight={15}
                                    source={greetingIcon}
                                ></Images>

                                <Blocks
                                    flex={1}
                                    justify={'center'}
                                >
                                    <Text h4 gray>{currentTime}</Text>
                                    <Text  size={sizes.sm} gray>Realtime Insight</Text>

                                </Blocks>
                            </Blocks>
                            <Blocks
                                paddingLeft={15}>
                                <Text h3 black bold>Today:</Text>
                                <Text h4>{moment().format('dddd')}</Text>
                                <Text h4>{moment().format('LL')}</Text>
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

                            <DateSelectionCalendar
                                locale={English}
                                theme={CustomTheme}
                                onSelectDate={setSelectedDate}
                                selectedDate={selectedDate}
                            />

                        </Blocks>
                        <Divider/>



                        <Blocks
                            width={'100%'}
                            flex={1}
                            center
                            justify={'center'}
                        >
                            <Blocks
                                marginBottom={sizes.sm}
                                width={'100%'}
                                flex={1}
                                center
                                align={'center'}
                                row
                                justify={'center'}>
                                <Blocks
                                    marginRight={5}
                                    padding={15}
                                    paddingLeft={20}
                                    card>
                                    <Blocks
                                        row
                                        align={'center'}
                                        justify={'center'}
                                        flex={1}>
                                        <Text
                                            marginRight={"20%"}
                                            h2
                                        >{totalStudentByGrade || 0}</Text>
                                        <FontAwesome5
                                            size={25}
                                            name={'user-graduate'}
                                            color={colors.success}
                                        />
                                    </Blocks>
                                    <Text p bold>Total Student</Text>
                                </Blocks>
                                <Blocks
                                    marginLeft={5}
                                    padding={15}
                                    paddingLeft={20}
                                    card>
                                    <Blocks
                                        row
                                        align={'center'}
                                        justify={'center'}
                                        flex={1}>
                                        <Text
                                            marginRight={"25%"}
                                            h2
                                        >{presentStudentsByGradeToday || 0}</Text>
                                        <Ionicons
                                            size={25}
                                            name={'enter'}
                                            color={colors.success}
                                        />
                                    </Blocks>
                                    <Text p bold>Present Student</Text>

                                </Blocks>
                            </Blocks>

                            <Blocks
                                marginBottom={sizes.sm}
                                width={'100%'}
                                flex={1}
                                center
                                align={'center'}
                                row
                                justify={'center'}>
                                <Blocks
                                    marginRight={5}
                                    padding={15}
                                    paddingLeft={20}
                                    card
                                >
                                    <Blocks
                                        row
                                        align={'center'}
                                        justify={'center'}
                                        flex={1}
                                    >
                                        <Text
                                            marginRight={"25%"}
                                            h2
                                        >{(totalStudentByGrade - presentStudentsByGradeToday)}</Text>
                                        <MaterialCommunityIcons
                                            size={25}
                                            name={'emoticon-sad'}
                                            color={colors.success}
                                        />
                                    </Blocks>
                                    <Text p bold>Absent Student</Text>
                                </Blocks>
                                <Blocks
                                    padding={15}
                                    marginLeft={5}
                                    card
                                    paddingLeft={20}
                                >
                                    <Blocks
                                        row
                                        align={'center'}
                                        justify={'center'}
                                        flex={1}>
                                        <Text
                                            marginRight={"25%"}
                                            h2
                                        >{presentStudentsLateByGradeToday || 0}</Text>
                                        <MaterialCommunityIcons
                                            size={25}
                                            name={'account-clock'}
                                            color={colors.success}
                                        />
                                    </Blocks>
                                    <Text p bold>Late Student</Text>

                                </Blocks>
                            </Blocks>
                        </Blocks>
                        <Divider/>


                    </Blocks>
                </Blocks>
            </Blocks>
        </Blocks>
    );
};

export default Dashboard
