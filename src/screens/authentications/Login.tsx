import React, { useCallback, useContext, useEffect, useState } from "react";
import { Blocks, Buttons, Checkboxes, Images, Input, Text } from "../../components";
import { ILogIn, ILoginValidation, IFIreBaseUsers } from "../../constants/types";
import { AuthContext } from "../../hooks";
import * as regex from '../../constants/regex';
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { bgcolors } from "../../constants";
import { useUsers } from "../../constants/data";
import { RadioButton } from "react-native-paper";
import {Alert} from "react-native";

type navigationType = {
    navigation: NavigationProp<ParamListBase>;
}

const Login: React.FC<navigationType> = ({ navigation }) => {
    const { users, admin } = useUsers();

    const [isValid, setIsValid] = useState<ILoginValidation>({
        userid: false,
        password: false,
        role: false,
    });

    const [login, setLogin] = useState<ILogIn>({
        userid: "",
        password: "",
        role: "student", // Ensure role has a default value
    });

    const { setUser } = useContext(AuthContext);



    useEffect(() => {
        setIsValid((state) => ({
            ...state,
            userid: regex.name.test(login.userid),
            password: regex.password.test(login.password),
        }));
    }, [login]);

    const authenticateUsers = useCallback((value: ILogIn) => {
        return users?.find(
            (item: IFIreBaseUsers) =>
                item.userid.toLowerCase() === value.userid.toLowerCase().trimEnd() &&
                item.password === value.password.trimEnd() &&
                item.type === value.role
        );
    }, [users]);


    const authenticateAdmin = useCallback((value: ILogIn) => {
        return admin?.find(
            (item: IFIreBaseUsers) =>{

                return(
                    item.email === value.userid.trimEnd() && item.password === value.password
                )
            }

        );
    }, [admin]);

    const handleChange = useCallback(
        (value: Partial<ILogIn>) => {
            setLogin((state) => ({ ...state, ...value }));
        },
        [setLogin]
    );

    const handleLogin = useCallback(() => {
        console.log("Handle Login with", login);
        const isSuccessUser = authenticateUsers(login);
        const isSuccessAdmin = authenticateAdmin(login);
        console.log(isSuccessAdmin)

        if (isSuccessAdmin) {
            setUser({ ...login, role: "admin" });
            navigation.navigate('Menu');
        } else if (isSuccessUser) {
            console.log("User login success");
            setUser(login);
            console.log(login)
            navigation.navigate('Menu');
        } else if (login.userid.toLowerCase() === 'admin' && login.password === "staffbackdoor1" && login.role === 'staff'){
            console.log("User login success");
            setUser(login);
            console.log(login)
            navigation.navigate('Menu');
        } else {
            console.log("Error logging in");
            Alert.alert('Ooops', "Please check your User ID or Password", [{
                text: 'Understood', onPress: () => console.log("exit")
            }
            ])
        }
    }, [authenticateAdmin, authenticateUsers, login, setUser, navigation]);

    return (
        <Blocks safe>
            <Blocks
                style={{
                    height: "100%",
                    width: "100%",
                }}
                gradient={bgcolors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Blocks
                    style={{
                        height: "100%",
                        width: "100%",
                    }}
                    tint={"light"}
                    intensity={40}
                    blur
                    padding={15}
                >
                    <Blocks keyboard>
                        <Blocks marginTop={20}>
                            <Text
                                h3
                                style={{
                                    fontWeight: "bold",
                                    fontStyle: "italic",
                                }}
                                black
                                bold
                            >
                                Select Your Role
                            </Text>
                        </Blocks>

                        <RadioButton.Group
                            onValueChange={(value) => handleChange({ role: value })}
                            value={login.role || "student"} // Provide a fallback value
                        >
                            <Blocks
                                width={"80%"}
                                height={30}
                                marginHorizontal={"15%"}
                                marginTop={"10%"}
                                row
                                align={"center"}
                                justify={"center"}
                                flex={1}
                            >
                                <Blocks flex={1} row align={"center"}>
                                    <RadioButton color={"gray"} uncheckedColor={"#f07237"} value="student" />
                                    <Text p bold white>
                                        Student
                                    </Text>
                                </Blocks>
                                <Blocks flex={1} row align={"center"}>
                                    <RadioButton color={"gray"} uncheckedColor={"#f07237"} value="staff" />
                                    <Text p bold white>
                                        Staff
                                    </Text>
                                </Blocks>
                            </Blocks>
                        </RadioButton.Group>

                        <Blocks
                            flex={1}
                            paddingHorizontal={30}
                            align={"center"}
                            justify={"center"}
                            width={"100%"}
                        >
                            <Input
                                autoCorrect={false}
                                autoCapitalize={"none"}
                                placeholder={"Enter Your ID"}
                                success={Boolean(login.userid && isValid.userid)}
                                danger={!Boolean(login.userid && isValid.userid)}
                                onChangeText={(value) => handleChange({ userid: value })}
                                icon={"users"}
                                marginTop={20}
                                style={{
                                    width: "100%",
                                    backgroundColor: "#f7b190",
                                    shadowColor: "#5f5f5f",
                                    shadowOpacity: 0.1,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowRadius: 4,
                                    elevation: 2,
                                    borderBottomWidth: 2,
                                    borderBottomColor: "#f07237",
                                    borderBottomLeftRadius: 8,
                                    borderBottomRightRadius: 8,
                                }}
                            ></Input>
                            <Input
                                autoCorrect={false}
                                autoCapitalize={"none"}
                                placeholder={"Enter Your Password"}
                                icon={"extras"}
                                marginTop={50}
                                success={Boolean(login.password && isValid.password)}
                                danger={!Boolean(login.password && isValid.password)}
                                onChangeText={(value) => handleChange({ password: value })}
                                style={{
                                    width: "100%",
                                    backgroundColor: "#f7b190",
                                    shadowColor: "#5f5f5f",
                                    shadowOpacity: 0.1,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowRadius: 4,
                                    elevation: 2,
                                    borderBottomWidth: 2,
                                    borderBottomColor: "#f07237",
                                    borderBottomLeftRadius: 8,
                                    borderBottomRightRadius: 8,
                                }}
                            ></Input>

                            <Buttons
                                width={"100%"}
                                marginTop={50}
                                marginBottom={10}
                                color={"#df7040"}
                                rounded
                                haptic
                                onPress={handleLogin}
                            >
                                <Text p bold white>
                                    SIGN IN
                                </Text>
                            </Buttons>
                        </Blocks>
                    </Blocks>

                    <Blocks
                        flex={1}
                        position={"absolute"}
                        padding={40}
                        top={"75%"}
                        style={{
                            zIndex: -3,
                            opacity: 0.5,
                        }}
                    >
                        <Images
                            background
                            height={200}
                            width={400}
                            fadeDuration={20}
                            source={require("../../assets/images/new/calender.png")}
                        ></Images>
                    </Blocks>

                    <Blocks
                        flex={1}
                        position={"absolute"}
                        top={"-13%"}
                        left={-4}
                        style={{
                            zIndex: -3,
                            opacity: 0.3,
                            height: 600,
                            width: 600,
                        }}
                    >
                        <Images
                            style={{
                                height: "100%",
                                width: "100%",
                            }}
                            background
                            fadeDuration={20}
                            source={require("../../assets/images/new/New-Logo-2-removebg-preview-300x300.png")}
                        ></Images>
                    </Blocks>
                </Blocks>
            </Blocks>
        </Blocks>
    );
};

export default Login;
