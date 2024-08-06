import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
// MY COMPONENTS
// MY ASSEST
// @ts-ignore
import User from "../assets/images/avatar1.png";
import {useTheme, useAuth} from "../hooks";
import AdminNavigation from "./AdminNavigation";
import TeacherNavigation from "./TeacherNavigation";
import StudentNavigation from "./StudentNavigation";
import {usePushNotification} from "../constants/data/usePushNotification";
// FIREBASE DATABASE
import {database} from "../utils/firebaseConfig";
import {ref, update} from "firebase/database";
import {useEffect} from "react";


// ASSIGN FUNCTIONS
const Tab = createBottomTabNavigator()

const updateUserDevice = (userId: string, deviceToken : string) => {
    let sanitizedUserId = userId.toLowerCase();
    // Split userId at "@" symbol and use the first part
    if (sanitizedUserId.includes('@')) {
        sanitizedUserId = sanitizedUserId.split('@')[0];
    }
    const sanitizedDeviceToken = deviceToken.replace(/[.#$/[\]]/g, '_');
    const userDeviceRef = ref(database, `usersDevices/${sanitizedUserId}/devices/${sanitizedDeviceToken}`);

    update(userDeviceRef, { token: deviceToken })
        .then(() => {
            console.log('Device token saved for user:', userId);
        })
        .catch((error) => {
            console.error('Error saving device token:', error);
        });
}
const Menu = () => {
    const { colors} = useTheme();
    const user = useAuth()
    const {expoPushToken, notification} = usePushNotification()
    const data = JSON.stringify(notification, undefined, 2)
    console.log(data )
    console.log(expoPushToken?.data)
    useEffect(() => {
        if (user && expoPushToken){
            updateUserDevice(user.userid, expoPushToken.data)
        }
    }, [user, expoPushToken]);


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
            {user?.role === 'student' && <Tab.Screen name="Student" component={StudentNavigation} />}
            {user?.role === 'staff' && <Tab.Screen name="Teacher" component={TeacherNavigation} />}
            {user?.role === 'admin' && <Tab.Screen name="Admin" component={AdminNavigation} />}
        </Tab.Navigator>
    )
}
export default Menu
