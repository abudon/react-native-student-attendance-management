// REACT NATIVE COMPONENT
import {View, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {
    DrawerItemList,
    createDrawerNavigator, DrawerContentComponentProps,
} from "@react-navigation/drawer";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
// EXPO COMPONENT
import {SimpleLineIcons} from "@expo/vector-icons";

// MY COMPONENTS

import {Text, Images, Blocks} from '../components'
// MY ASSEST
// @ts-ignore
import User from "../assets/images/avatar1.png";
import {useTheme, useAuth} from "../hooks";
import AdminNavigation from "./AdminNavigation";
import TeacherNavigation from "./TeacherNavigation";
import StudentNavigation from "./StudentNavigation";




// ASSIGN FUNCTIONS
const Drawer = createDrawerNavigator()
const Tab = createBottomTabNavigator()

const Menu = () => {
    const { colors} = useTheme();
    const user = useAuth()

    return(
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    display: 'none'
                }
            }}
        >
            {user.role === 'student' && <Tab.Screen name="Student" component={StudentNavigation} />}
            {user.role === 'teacher' && <Tab.Screen name="Teacher" component={TeacherNavigation} />}
            {user.role === 'admin' && <Tab.Screen name="Admin" component={AdminNavigation} />}
        </Tab.Navigator>
    )
}
export default Menu
