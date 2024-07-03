import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../hooks";
import { route } from "../../constants";

type NavigationType = {
    navigation: NavigationProp<ParamListBase>;
};

const Logout: React.FC<NavigationType> = ({ navigation }) => {
    const { setUser } = useContext(AuthContext);

    useEffect(() => {
        // Perform the logout logic inside useEffect
        setUser({
            userid: '',
            password: '',
            role: ''
        });
        navigation.navigate(route.Welcome);
    }, [setUser, navigation]);

    return null;
};

export default Logout;
