import React from 'react';

import {
   createDrawerNavigator
} from "@react-navigation/drawer";

// MY SCREENS
import {Welcome, Login} from "../screens"

import {route} from "../constants";


const Drawer = createDrawerNavigator()

const Auth: React.FC = () =>{
    return(
        <Drawer.Navigator
            initialRouteName={route.Welcome}>
            <Drawer.Screen
                name={route.Welcome}
                options={{
                    headerShown: false
                }}
                component={Welcome}
            />
            <Drawer.Screen
                name={route.Login}
                options={{
                    headerShown: false
                }}
                component={Login}
            />
        </Drawer.Navigator>
    )
}
export default Auth

