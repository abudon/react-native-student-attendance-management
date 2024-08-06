
import React from "react";
import { Blocks, Images, Text, Buttons} from "../../components";
import {StyleSheet} from "react-native";
import {NavigationProp, ParamListBase} from "@react-navigation/native";
import {useTheme} from "../../hooks";
import {route} from "../../constants";

type navigationType = {
    navigation: NavigationProp<ParamListBase>
}


const Welcome: React.FC<navigationType> = ({navigation}) => {

    return(
        <Blocks
            safe
        >
            <Blocks
            gradient={["#f5f5f5","#254","#2e4"]}
            start={{x:0,y:0}}
            end={{x:1,y:1}}
            padding={5}
            style={{
                flex: 1,
                position: "relative",
                width: '100%',
                height: '100%',
            }}
            >
                <Blocks
                blur
                intensity={40}
                radius={10}
                style={{
                    flex: 1,
                    position: "relative",
                    width: '100%',
                    height: '100%',
                }}
                tint={"light"}
                >
                <Images
                    source={require("../../assets/images/new/calender.png")}
                    style={{
                        width: "100%",
                        height: "42%",
                        borderRadius: 60,
                        position: "absolute",
                        top: "50%",
                        left: '50%',
                        transform: [
                            {translateX: -150},
                            {translateY: -80},
                            {rotate: "-4.5deg"}
                        ]
                    }}
                >

                </Images>
                    <Images
                        style={{
                                flex: 1,
                            position: 'absolute',
                            top: '.5%',
                            right: "-3.5%",
                            width: 150,
                            height: 150

                        }}
                        source={require("../../assets/images/new/New-Logo-2-removebg-preview-300x300.png")}>
                    </Images>
                    <Blocks
                        paddingRight={10}
                        style={{
                            width:"70%"
                        }}
                    >
                        <Text
                            h2
                            color={'#008000'}
                            style={styles.headingText}
                            paddingLeft={3}
                            bold
                            weight={'900'}
                        >
                            FORTVILLE

                        </Text>
                        <Text
                            h2
                            color={'#008000'}
                            style={styles.headingText}
                            paddingLeft={3}
                            bold
                            weight={'900'}
                        >
                            ACADEMY
                        </Text>
                        <Text
                            h4
                            color={"#df7040"}
                            style={{...styles.headingText}}
                            paddingLeft={5}
                        >
                            ATTENDANCE
                        </Text>
                        <Text
                            h4
                            color={"#df7040"}
                            style={{...styles.headingText}}
                            paddingLeft={5}
                        >
                            SYSTEM
                        </Text>
                    </Blocks>

                <Buttons
                    width={'100%'}
                    marginTop={200}
                    marginBottom={10}
                    color={'#df7040'}
                    rounded
                    haptic
                    onPress={()=>navigation.navigate(route.Login)}
                >
                    <Text
                        p
                        bold
                        color={'#2e4'}
                    >
                    SIGN IN
                </Text>
                </Buttons>
                </Blocks>
            </Blocks>
        </Blocks>
    )


}
const styles = StyleSheet.create({
headingText: {
    position: "relative",
    zIndex: 1,
    fontStyle: 'italic'

}
})


export default Welcome
