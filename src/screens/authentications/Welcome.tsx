
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
    const {gradients} = useTheme()
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
                intensity={60}
                radius={10}
                style={{
                    flex: 1,
                    position: "relative",
                    width: '100%',
                    height: '100%',
                }}
                tint={"dark"}
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
                            {translateX: -200},
                            {translateY: -80},
                            {rotate: "-4deg"}
                        ]
                    }}
                >

                </Images>
                    <Images
                        style={{
                                flex: 1,
                            position: 'absolute',
                            top: '.5%',
                            right: ".5%",
                            width: 200,
                            height: 200

                        }}
                        source={require("../../assets/images/new/New-Logo-2-removebg-preview-300x300.png")}>
                    </Images>
                    <Blocks
                        paddingRight={10}

                    >
                        <Text
                            h2
                            color={'#008000'}
                            style={styles.headingText}
                            paddingLeft={10}
                            bold
                        >
                            FORTVILLE ACADEMY
                        </Text>
                        <Text
                            h3
                            color={"#df7040"}
                            style={{...styles.headingText,
                            width: "60%"}}
                            paddingLeft={10}


                        >
                            ATTENDANCE SYSTEM
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
    fontSize: 24,
    fontStyle: 'italic'

}
})


export default Welcome
