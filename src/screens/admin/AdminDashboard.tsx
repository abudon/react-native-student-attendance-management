import {Blocks, Divider, Images, Text} from "../../components";
import {bgcolors} from "../../constants";
import moment from "moment/moment";
import {AntDesign, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {useTheme} from "../../hooks";
import {useEffect, useState, useCallback} from "react";
import { DateSelectionCalendar, DefaultTheme, Theme } from 'react-native-easy-calendar';
import English from 'dayjs/locale/en';
import {useAttendanceAdmin} from "../../constants/data";
import {FlatList, RefreshControl} from 'react-native'
import {ITopAttendance} from "../../constants/types";


const AdminDashboard = () => {

    const { totalStaffs,
        totalStudent,
        staffPresent,
        studentPresent,
    topStudent,
        topStaff}
        = useAttendanceAdmin();
    const { sizes, colors } = useTheme();
    const [currentTime, setCurrentTime] = useState(moment().format('LTS'));
    const [greetingIcon, setGreetingIcon] = useState(require('../../assets/images/new/morning_icon.png'));
    const getHour = new Date().getHours();
    const currentDate = moment().format('YYYY-MM-DD');
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [topestStaff, setTopestStaff] = useState<ITopAttendance[]>([]);
    const [topestStudent, setTopestStudent] = useState<ITopAttendance[]>([]);
    const [refreshing, setRefreshing] = useState(false);



    const fetchData = async () => {
        return { newTopStaff: topStaff, newTopStudent: topStudent };
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        const { newTopStaff, newTopStudent } = await fetchData();
        setTopestStaff(newTopStaff);
        setTopestStudent(newTopStudent);
        setRefreshing(false);
    }, []);

    useEffect(() => {
        setTopestStaff(topStaff);
        setTopestStudent(topStudent);
    }, [topStaff, topStudent]);


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
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
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
                                        >{totalStudent ?? 0}</Text>
                                        <FontAwesome5
                                            size={25}
                                            name={'user-graduate'}
                                            color={colors.success}
                                        />
                                    </Blocks>
                                    <Text p bold>Total Student</Text>
                                </Blocks>
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
                                        >{totalStaffs ?? 0}</Text>
                                        <AntDesign
                                            size={25}
                                            name={'team'}
                                            color={colors.success}
                                        />
                                    </Blocks>
                                    <Text p bold>Total Staff</Text>

                                </Blocks>
                            </Blocks>


                            <Blocks
                                marginBottom={sizes.s}
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
                                        >{studentPresent ?? 0}</Text>
                                        <MaterialCommunityIcons
                                            size={25}
                                            name={'account-clock'}
                                            color={colors.success}
                                        />
                                    </Blocks>
                                    <Text p bold>Present Students</Text>
                                </Blocks>
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
                                        >{staffPresent ?? 0}</Text>
                                        <FontAwesome6
                                            size={25}
                                            name={'user-clock'}
                                            color={colors.success}
                                        />
                                    </Blocks>
                                    <Text p bold>Present Staffs</Text>

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
                                flexDirection: 'column',
                                padding: 4
                            }}
                        >
                            <Text h5 style={{
                                fontStyle: 'italic',
                                fontFamily: 'Poppins'
                            }}>Top Staffs Attendance Record</Text>
                            <Blocks>
                                <FlatList
                                    data={topestStaff}
                                    keyExtractor={(item)=>item.id}
                                    renderItem={({item})=>(
                                        <Blocks
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                padding: 4,
                                                justifyContent: 'space-between',
                                                alignItems: "center",
                                                marginTop: 2
                                            }}>
                                            <Text size={12} p bold>{item.name}</Text>
                                            <Text  p bold>{`${(item.value) > 100 ? (item.value/100) : item.value}%`}</Text>
                                        </Blocks>
                                    )}
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
                                flexDirection: 'column',
                                padding: 4
                            }}
                        >
                            <Text  h5 style={{
                                fontStyle: 'italic',
                                fontFamily: 'Poppins'
                            }}>Top Student Attendance Record</Text>
                            <Blocks>
                                <FlatList
                                    data={topestStudent}
                                    keyExtractor={(item)=>item.id}
                                    renderItem={({item})=>(
                                        <Blocks
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                padding: 4,
                                                justifyContent: 'space-around',
                                                alignItems: "center"
                                            }}>
                                            <Text p size={12} bold>{item.name.split(" ")[0] + " " + item.name.split(" ")[1] }</Text>
                                            <Text p size={12} bold>{item.grade}</Text>
                                            <Text p bold>{`${(item.value) > 100 ? (item.value/100) : item.value}%`}</Text>
                                        </Blocks>
                                    )}
                                />
                            </Blocks>




                        </Blocks>


                        <Divider/>


                    </Blocks>
                </Blocks>
            </Blocks>
        </Blocks>
    );
};

export default AdminDashboard
