import {Blocks} from "../../components";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {route} from "../../constants";
import AdminTeachersReport from "./AdminTeachersReport";
import AdminStudentsReport from "./AdminStudentsReport";
import PreNursery from "./PreNursery";
import Nursery from "./Nursery";
import Grade_1 from "./Grade_1";
import Grade_2 from "./Grade_2";
import Grade_3 from "./Grade_3";
import Grade_4 from "./Grade_4";
import Grade_5 from "./Grade_5";
import {FontAwesome5, FontAwesome6, Octicons} from "@expo/vector-icons";
import {useTheme} from "../../hooks";




const Tab = createBottomTabNavigator()


const AdminAnalytics = () => {
    const {colors, sizes} = useTheme()

    return(
        <Tab.Navigator>
            <Tab.Screen
                options={{
                    tabBarIcon: ()=>(<FontAwesome5
                        color={colors.gray}
                        size={sizes.socialIconSize}
                        name={"chalkboard-teacher"}
                    ></FontAwesome5>)
                }}
                name={route.TeacherAnalysis}
                component={AdminTeachersReport}></Tab.Screen>
            <Tab.Screen
                options={{
                    tabBarIcon: ()=>(<FontAwesome6
                        color={colors.gray}
                        size={sizes.socialIconSize}
                        name={"children"}
                    ></FontAwesome6>)
                }}
                name={route.StudentsAnalysis}
                component={AdminStudentsReport}></Tab.Screen>
            <Tab.Screen
                options={{
                    tabBarButton:()=>null
                }}
                name={"PreNursery"}
                component={PreNursery}>

            </Tab.Screen>
            <Tab.Screen
                options={{
                    tabBarButton:()=>null
                }}
                name={"Nursery"}
                component={Nursery}>

            </Tab.Screen>
            <Tab.Screen
                options={{
                    tabBarButton:()=>null
                }}
                name={"Grade 1"}
                component={Grade_1}>

            </Tab.Screen>
            <Tab.Screen
                options={{
                    tabBarButton:()=>null
                }}
                name={"Grade 2"}
                component={Grade_2}>

            </Tab.Screen>
            <Tab.Screen
                options={{
                    tabBarButton:()=>null
                }}
                name={"Grade 3"}
                component={Grade_3}>

            </Tab.Screen>
            <Tab.Screen
                options={{
                    tabBarButton:()=>null
                }}
                name={"Grade 4"}
                component={Grade_4}>

            </Tab.Screen>
            <Tab.Screen
                options={{
                    tabBarButton:()=>null
                }}
                name={"Grade 5"}
                component={Grade_5}>

            </Tab.Screen>
        </Tab.Navigator>
    )
}


export default AdminAnalytics
