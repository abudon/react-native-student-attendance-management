// REACT NATIVE COMPONENT
import {View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {
    DrawerItemList,
    createDrawerNavigator
} from "@react-navigation/drawer";
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
// EXPO COMPONENT

// MY COMPONENTS

import {Text, Images, Blocks} from '../components'
// MY ASSEST
// @ts-ignore
import User from "../assets/images/avatar1.png";
import {useAuth, useTheme} from "../hooks";
import {route} from "../constants";
import {AdminAnalytics, AdminDashboard, AdminReports, Logout} from "../screens";
import {MaterialCommunityIcons, MaterialIcons, Octicons} from "@expo/vector-icons";
import {useUsers} from "../constants/data";
import {useEffect, useState} from "react";
import {IFIreBaseUsers} from "../constants/types";



// ASSIGN FUNCTIONS
const Drawer = createDrawerNavigator()


const AdminNavigation = () => {

    const { colors, gradients} = useTheme()
    const {admin} = useUsers()
    const {userid} = useAuth()
    const [person, setPerson] = useState<IFIreBaseUsers>();

    useEffect(() => {
        if (admin && userid){
            const user = admin.find(user=> user.email.toLowerCase() === userid.toLowerCase());
            setPerson(user)
        }


    }, [admin, userid]);

    return(
        <Blocks gradient={gradients.light}>
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
                                    source={User}
                                    style={{
                                        height: 80,
                                        width: 80,
                                        borderRadius: 50
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
                                >{person?.fullname}</Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: "#111"
                                    }}
                                >{person?.subjectTaught}</Text>
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
                        fontSize: 28

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
                        backgroundColor: colors.white,
                        width: 250
                    }
                })}
            >


                <Drawer.Screen name={route.AdminDashboard} component={AdminDashboard}  options={{
                    drawerIcon: () => (
                        <MaterialIcons name={"dashboard"} size={23} color={colors.gray}/>
                    )
                }}/>
                <Drawer.Screen
                    options={{
                        drawerIcon: () => (
                            <MaterialIcons name={"analytics"} size={23} color={colors.gray}/>
                        )
                    } }
                    name={route.AdminAnalytics}
                    component={AdminAnalytics} />
                <Drawer.Screen
                    options={{
                        drawerIcon: () => (
                            <Octicons name={"report"} size={23} color={colors.gray}/>
                        )
                    } }
                    name={route.AdminReport}
                    component={AdminReports} />
                <Drawer.Screen
                    options={{
                        drawerIcon: () => (
                            <MaterialCommunityIcons name={"logout"} size={23} color={colors.gray}/>
                        )
                    } }
                    name={route.Logout}
                    component={Logout}/>

            </Drawer.Navigator>

        </Blocks>

)
}
export default AdminNavigation
