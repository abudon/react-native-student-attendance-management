import React from 'react'
import {Blocks, Divider, Images, Text} from "../../components";
import {AntDesign, FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import {useTheme} from "../../hooks";
import {NavigationProp, ParamListBase} from "@react-navigation/native";

type navigationType = {
    navigation: NavigationProp<ParamListBase>
}

const AdminStudentsReport: React.FC<navigationType> =({navigation}) => {
    const {sizes, gradients,  icons, colors} = useTheme()

    return (

        <Blocks
            style={{
                width: '100%',
                height: "100%"
            }}
            gradient={gradients.light}
            start={{
                x:1,
                y: 0
            }}
            end={{x:0, y:0.3}}
        >
            <Blocks
                blur
                intensity={60}
                tint={'light'}
                flex={1}
                align={'center'}
                justify={"center"}
                style={{
                    height: "100%",
                    width: "100%"
                }}
            >
                <Blocks
                    safe
                    style={{
                        height: "100%",
                        width: "100%",
                        flex: 1,
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Blocks
                        scroll
                        style={{
                            width: "100%",
                            height: "100%",
                            padding: 20

                        }}
                    >



                        <Blocks
                            width={'100%'}
                            flex={1}
                            center
                            justify={'center'}
                        >
                            <Blocks
                                marginBottom={sizes.sm}
                                width={'100%'}
                                flex={1}
                                center
                                align={'center'}
                                row
                                justify={'center'}>
                                <Blocks
                                    color={"transparent"}
                                    marginRight={5}
                                    padding={15}
                                    paddingLeft={20}
                                    card
                                    flex={1}
                                    justify={"space-between"}
                                    align={"center"}
                                    row
                                    shadow
                                    style={{
                                        borderColor: colors.primary,
                                        borderWidth: 1,
                                        borderStyle: 'solid'

                                    }}
                                >
                                    <Images
                                        source={icons.users}
                                    ></Images>
                                    <Text p bold black>Pre-Nursery</Text>
                                    <Ionicons
                                        size={sizes.socialIconSize}
                                        color={"white"}
                                        onPress={()=>navigation.navigate("PreNursery")}
                                        name={'chevron-forward-circle-sharp'}/>

                                </Blocks>
                            </Blocks>

                            <Blocks
                                marginBottom={sizes.sm}
                                width={'100%'}
                                flex={1}
                                center
                                align={'center'}
                                row
                                justify={'center'}>
                                <Blocks
                                    color={"transparent"}
                                    marginRight={5}
                                    padding={15}
                                    paddingLeft={20}
                                    card
                                    flex={1}
                                    justify={"space-between"}
                                    align={"center"}
                                    row
                                    shadow
                                    style={{
                                        borderColor: colors.primary,
                                        borderWidth: 1,
                                        borderStyle: 'solid'

                                    }}
                                >
                                    <Images
                                        source={icons.users}
                                    ></Images>
                                    <Text p bold black>Nursery</Text>
                                    <Ionicons
                                        onPress={()=>navigation.navigate("Nursery")}
                                        size={sizes.socialIconSize}
                                        color={"white"}
                                        name={'chevron-forward-circle-sharp'}/>

                                </Blocks>
                            </Blocks>

                            <Blocks
                                marginBottom={sizes.sm}
                                width={'100%'}
                                flex={1}
                                center
                                align={'center'}
                                row
                                justify={'center'}>
                                <Blocks
                                    color={"transparent"}
                                    marginRight={5}
                                    padding={15}
                                    paddingLeft={20}
                                    card
                                    flex={1}
                                    justify={"space-between"}
                                    align={"center"}
                                    row
                                    shadow
                                    style={{
                                        borderColor: colors.primary,
                                        borderWidth: 1,
                                        borderStyle: 'solid'

                                    }}
                                >
                                    <Images
                                        source={icons.users}
                                    ></Images>
                                    <Text p bold black>Grade 1</Text>
                                    <Ionicons
                                        onPress={()=>navigation.navigate("Grade 1")}
                                        size={sizes.socialIconSize}
                                        color={"white"}
                                        name={'chevron-forward-circle-sharp'}/>

                                </Blocks>
                            </Blocks>

                            <Blocks
                                marginBottom={sizes.sm}
                                width={'100%'}
                                flex={1}
                                center
                                align={'center'}
                                row
                                justify={'center'}>
                                <Blocks
                                    color={"transparent"}
                                    marginRight={5}
                                    padding={15}
                                    paddingLeft={20}
                                    card
                                    flex={1}
                                    justify={"space-between"}
                                    align={"center"}
                                    row
                                    shadow
                                    style={{
                                        borderColor: colors.primary,
                                        borderWidth: 1,
                                        borderStyle: 'solid'

                                    }}
                                >
                                    <Images
                                        source={icons.users}
                                    ></Images>
                                    <Text p bold black>Grade 2</Text>
                                    <Ionicons
                                        onPress={()=>navigation.navigate("Grade 2")}
                                        size={sizes.socialIconSize}
                                        color={"white"}
                                        name={'chevron-forward-circle-sharp'}/>

                                </Blocks>
                            </Blocks>

                            <Blocks
                                marginBottom={sizes.sm}
                                width={'100%'}
                                flex={1}
                                center

                                align={'center'}
                                row
                                justify={'center'}>
                                <Blocks
                                    color={"transparent"}
                                    marginRight={5}
                                    padding={15}
                                    paddingLeft={20}
                                    card
                                    flex={1}
                                    justify={"space-between"}
                                    align={"center"}
                                    row
                                    shadow
                                    style={{
                                        borderColor: colors.primary,
                                        borderWidth: 1,
                                        borderStyle: 'solid'

                                    }}
                                >
                                    <Images
                                        source={icons.users}
                                    ></Images>
                                    <Text p bold black>Grade 3</Text>
                                    <Ionicons
                                        onPress={()=>navigation.navigate("Grade 3")}
                                        size={sizes.socialIconSize}
                                        color={"white"}
                                        name={'chevron-forward-circle-sharp'}/>

                                </Blocks>
                            </Blocks>


                            <Blocks
                                marginBottom={sizes.sm}
                                width={'100%'}
                                flex={1}
                                center
                                align={'center'}
                                row
                                justify={'center'}>
                                <Blocks
                                    color={"transparent"}
                                    marginRight={5}
                                    padding={15}
                                    paddingLeft={20}
                                    card
                                    flex={1}
                                    justify={"space-between"}
                                    align={"center"}
                                    row
                                    shadow
                                    style={{
                                        borderColor: colors.primary,
                                        borderWidth: 1,
                                        borderStyle: 'solid'

                                    }}
                                >
                                    <Images
                                        source={icons.users}
                                    ></Images>
                                    <Text p bold black>Grade 4</Text>
                                    <Ionicons
                                        onPress={()=>navigation.navigate("Grade 4")}
                                        size={sizes.socialIconSize}
                                        color={"white"}
                                        name={'chevron-forward-circle-sharp'}/>

                                </Blocks>
                            </Blocks>


                            <Blocks
                                marginBottom={sizes.sm}
                                width={'100%'}
                                flex={1}
                                center
                                align={'center'}
                                row
                                justify={'center'}>
                                <Blocks
                                    color={"transparent"}
                                    marginRight={5}
                                    padding={15}
                                    paddingLeft={20}
                                    card
                                    flex={1}
                                    justify={"space-between"}
                                    align={"center"}
                                    row
                                    shadow
                                    style={{
                                        borderColor: colors.primary,
                                        borderWidth: 1,
                                        borderStyle: 'solid'

                                    }}
                                >
                                    <Images
                                        source={icons.users}
                                    ></Images>
                                    <Text p bold black>Grade 5</Text>
                                    <Ionicons
                                        onPress={()=>navigation.navigate("Grade 5")}
                                        size={sizes.socialIconSize}
                                        color={"white"}
                                        name={'chevron-forward-circle-sharp'}/>

                                </Blocks>
                            </Blocks>

                        </Blocks>
                    </Blocks>
                </Blocks>
            </Blocks>
        </Blocks>
    )
}



export default AdminStudentsReport
