// REACT NATIVE COMPONENT
import {View, Image} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {
    DrawerItemList,
    createDrawerNavigator, DrawerContentComponentProps,
} from "@react-navigation/drawer";
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
// EXPO COMPONENT
import {SimpleLineIcons} from "@expo/vector-icons";

// MY COMPONENTS

import {Text, Images, Blocks} from '../components'
// MY ASSEST
// @ts-ignore
import User from "../assets/images/avatar1.png";
import {useTheme} from "../hooks";
import {route} from "../constants";
import {TeacherDashboard} from "../screens";



// ASSIGN FUNCTIONS
const Drawer = createDrawerNavigator()


const TeacherNavigation = () => {

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

    screenOptions={( {navigation}) => ({
        headerStyle: {
            backgroundColor: "#005f33",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontWeight: "bold",
            fontStyle: "italic",
            fontSize: 32

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
    }
})}
>


    <Drawer.Screen name={route.TeacherDashboard} component={TeacherDashboard} />

    </Drawer.Navigator>
)
}
export default TeacherNavigation
