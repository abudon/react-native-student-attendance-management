import {Blocks, Divider, Images, Text} from "../../components";
import {useTheme} from "../../hooks";
import moment from "moment";
import {useEffect, useState} from "react";
import {interpolate} from "react-native-reanimated";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {bgcolors} from "../../constants";
import {useAttendance} from "../../constants/data";



const StudentDashboard = () => {
    const {gradients, sizes, colors} = useTheme()
    const [currentTime, setCurrentTime] = useState(moment().format('LTS'));
    const [greetingIcon, setGreetingIcon] = useState(require('../../assets/images/new/morning_icon.png'));
    const getHour = new Date().getHours()
    const {attendanceDays, attendance, attendanceDateByStudent} = useAttendance()






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

    useEffect(() => {


    }, []);




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
                    intensity={70}
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
                                    marginBottom={3}
                                    paddingLeft={15}>
                                    <Text h3 black bold style={{
                                        fontStyle: 'italic'
                                    }}>Today:</Text>
                                    <Text h4>{moment().format('dddd')}</Text>
                                    <Text h4>{moment().format('LL')}</Text>
                                </Blocks>

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
                                    justify={'center'}
                                    >
                                    <Blocks
                                        flex={1}
                                        align={'center'}
                                        justify={'center'}
                                        card
                                        marginRight={3}
                                    >
                                        <Blocks
                                            row
                                            align={'center'}
                                            justify={'center'}
                                            flex={1}>
                                            <Text
                                                marginRight={"20%"}
                                                h3
                                            >{ Math.ceil((attendanceDateByStudent/attendanceDays)*100) || 0}</Text>
                                            <MaterialCommunityIcons
                                                size={25}
                                                name={'percent'}
                                                color={colors.success}
                                            />
                                        </Blocks>
                                        <Text p bold>Percentage</Text>
                                    </Blocks>
                                    <Blocks
                                        flex={1}
                                        align={'center'}
                                        justify={'center'}
                                        card
                                        marginLeft={3}
                                    >
                                        <Blocks
                                            row
                                            align={'center'}
                                            justify={'center'}
                                            flex={1}
                                        >
                                            <Text
                                                marginRight={"20%"}
                                                h3
                                            >{attendanceDateByStudent || 0}</Text>
                                            <MaterialCommunityIcons
                                                size={25}
                                                name={'account-clock'}
                                                color={colors.success}
                                            />
                                        </Blocks>
                                        <Text p bold>Present Days</Text>

                                    </Blocks>
                                </Blocks>
                                <Blocks
                                    center
                                    width={'100%'}
                                    flex={1}
                                    justify={'center'}
                                    align={"center"}
                                >
                                    <Blocks
                                        style={{
                                            alignSelf: 'center'
                                        }}
                                        flex={1}
                                        align={'center'}
                                        justify={'center'}
                                        card
                                    >

                                        <Blocks
                                            marginBottom={10}
                                            row
                                            align={'center'}
                                            flex={1}>
                                            <Text
                                                marginRight={'20%'}
                                                h3
                                            >{(attendanceDays - attendanceDateByStudent) || 0}</Text>
                                            <MaterialCommunityIcons
                                                size={25}
                                                name={'clock-remove'}
                                                color={colors.success}
                                            />
                                        </Blocks>
                                        <Text p bold>Absent Days</Text>

                                    </Blocks>


                                </Blocks>
                            </Blocks>
                            <Divider/>


                        </Blocks>
                    </Blocks>
            </Blocks>
        </Blocks>
    )
}

export default StudentDashboard
