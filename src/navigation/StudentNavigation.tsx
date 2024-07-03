// REACT NATIVE COMPONENT
import {View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {
    DrawerItemList,
    createDrawerNavigator
} from "@react-navigation/drawer";
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';

// MY COMPONENTS

import {Text, Images} from '../components'
// MY ASSEST
// @ts-ignore
import Avatar from "../assets/images/avatar1.png";
import {useAuth, useTheme} from "../hooks";
import {route} from "../constants";
import {Announcement, Logout, StudentDashboard, Timetable} from "../screens";
import {useUsers} from "../constants/data";
import {useEffect, useState} from "react";
import {IFIreBaseUsers} from "../constants/types";



// ASSIGN FUNCTIONS
const Drawer = createDrawerNavigator()


const StudentNavigation = () => {

    const { colors} = useTheme()
    const {users} = useUsers()
    const {userid} = useAuth()
    const [person, setPerson] = useState<IFIreBaseUsers>();

    useEffect(() => {
        if (users && userid){
            const user = users.find(user=> user.userid.toLowerCase() === userid.toLowerCase());
            setPerson(user)
        }


    }, [users, userid]);



    return(
        <Drawer.Navigator
            drawerContent={(props)=>{
        return(
            <SafeAreaView>
                <View
                    style={{
            height: 200,
                width: '100%',
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBottomWidth: 1
        }}
    >
        <Images
            source={Avatar}
        style={{
            height: 80,
            width: 80,
        }}
        />
        <Text
        primary={true}
        h5
        style={{
            fontSize: 22,
                marginVertical: 6,
                fontWeight: "bold",
                color: "#111"
        }}
    >{person?.fullname} </Text>
        <Text
            bold
        style={{
            fontSize: 20,
            color: "#111",
            fontWeight: 'bold'
        }}
    >Grade: {person?.grade}</Text>
        </View>
        <DrawerItemList {...props} />
        </SafeAreaView>
    )
    }}

    screenOptions={( {navigation}) => ({
        headerStyle: {
            backgroundColor: colors.success,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontWeight: "bold",
            fontStyle: "italic",
            fontSize: 26

        },
        headerRight: () => (
            <Icon
                name="menu"
        size={32}
        color="#fff" // Set icon color to white
        style={{ marginRight: 15 }} // Add margin to the right
    onPress={() => navigation?.toggleDrawer()}
    />
),
    headerLeft: ()=>null,
        drawerLabelStyle: {
        color: "#111"
    },
    drawerPosition: 'right',
        drawerStyle: {
        backgroundColor: "#fff",
            width: 250
    },
})}
>


            <Drawer.Screen
                options={{
                    drawerIcon: () => (
                        <MaterialCommunityIcons name={"view-dashboard"} size={23} color={colors.gray}/>
                    )
                } }
                name={route.StudentDashboard}
                component={StudentDashboard}/>
            <Drawer.Screen
                options={{
                    drawerIcon: () => (
                        <MaterialIcons name={"announcement"} size={23} color={colors.gray}/>
                    )
                } }
                name={route.Announcement}
                component={Announcement}/>
            <Drawer.Screen
                options={{
                    drawerIcon: () => (
                        <MaterialCommunityIcons name={"timetable"} size={23} color={colors.gray}/>
                    )
                } }
                name={route.Timetable}
                component={Timetable}/>

            <Drawer.Screen
                options={{
                    drawerIcon: () => (
                        <MaterialCommunityIcons name={"logout"} size={23} color={colors.gray}/>
                    )
                } }
                name={route.Logout}
                component={Logout}/>

    </Drawer.Navigator>
)
}
export default StudentNavigation
