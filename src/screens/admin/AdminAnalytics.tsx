import {Blocks} from "../../components";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {route} from "../../constants";
import StudentsAnalysis from "./StudentsAnalysis";
import TeachersAnalysis from "./TeachersAnalysis";
import {FontAwesome5, FontAwesome6} from "@expo/vector-icons";
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
                component={TeachersAnalysis}></Tab.Screen>
            <Tab.Screen
                options={{
                    tabBarIcon: ()=>(<FontAwesome6
                        color={colors.gray}
                        size={sizes.socialIconSize}
                        name={"children"}
                    ></FontAwesome6>)
                }}
                name={route.StudentsAnalysis}
                component={StudentsAnalysis}></Tab.Screen>
        </Tab.Navigator>
    )
}


export default AdminAnalytics
