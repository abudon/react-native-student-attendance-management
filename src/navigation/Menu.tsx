// REACT NATIVE COMPONENT
import {View, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import { DrawerItemList,
    createDrawerNavigator,
} from "@react-navigation/drawer";
// EXPO COMPONENT
import {SimpleLineIcons} from "@expo/vector-icons";
// MY SCREENS
import Home from "../screen/Home";
import Settings from "../screen/Settings";
// MY COMPONENTS

import {Text, Images, Blocks} from '../components'
// MY ASSEST
// @ts-ignore
import User from "../assets/images/avatar1.png";
import {useTheme} from "../hooks";



// ASSIGN FUNCTIONS
const Drawer = createDrawerNavigator()

const Menu = () => {
    const { colors} = useTheme()
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
                            >Abraham Abudon </Text>
                            <Text
                                style={{
                                    fontSize: 16,
                                    color: "#111"
                                }}
                            >Software Engineer</Text>
                        </View>
                        <DrawerItemList {...props} />
                    </SafeAreaView>
                )
            }}
            screenOptions={{
                drawerStyle: {
                    backgroundColor: "#fff",
                    width: 250
                },
                headerStyle: {
                    backgroundColor: "#f4511e",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                    fontWeight: "bold"
                },
                drawerLabelStyle: {
                    color: "#111"
                }
            }}
        >
            <Drawer.Screen
                name="Home"
                options={{
                    drawerLabel: "Home",
                    title: "Home",
                    drawerIcon: () => (
                        <SimpleLineIcons name="home" size={20} color="#808080" />
                    )
                }}
                component={Home}
            />

            <Drawer.Screen
                name="Settings"
                options={{
                    drawerLabel: "Settings",
                    title: "Settings",
                    drawerIcon: () => (
                        <SimpleLineIcons name="settings" size={20} color="#808080" />
                    )
                }}
                component={Settings}
            />

        </Drawer.Navigator>
    )
}
export default Menu
