// REACT COMPONENTS
import React, { useEffect } from "react";
// REACT NATIVE COMPONENTS
import {Platform, StatusBar} from 'react-native';
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import 'react-native-gesture-handler';
// EXPO COMPONENT
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
// MY PAGE
import Menu from './Menu'
import {ThemeProvider, useData} from "../hooks";
// MY HOOKS
// import {useData, ThemeProvider, TranslationProvider} from '../hooks';

SplashScreen.preventAutoHideAsync().then(()=>console.log("Preventing hide SplashScreen"))

export default function Main() {
    const {isDark, theme, setTheme} = useData()

    useEffect(() => {
        Platform.OS === 'android' && StatusBar.setTranslucent(true);
        StatusBar.setBarStyle(isDark?"light-content":"dark-content")
        return () => {
            StatusBar.setBarStyle('default')
        };
    }, [isDark]);

    const [fontsLoaded] =useFonts({
        'OpenSans-Light': theme.assets.OpenSansLight,
        'OpenSans-Regular': theme.assets.OpenSansRegular,
        'OpenSans-SemiBold': theme.assets.OpenSansSemiBold,
        'OpenSans-ExtraBold': theme.assets.OpenSansExtraBold,
        'OpenSans-Bold': theme.assets.OpenSansBold,
    })

    if (fontsLoaded) {
        const hideSplash = async () => {
            await SplashScreen.hideAsync();
        };
        hideSplash();
    }

    if (!fontsLoaded) {
        return null;
    }

    const navigationTheme = {
        ...DefaultTheme,
        dark: isDark,
        colors: {
            ...DefaultTheme.colors,
            border: 'rgba(0,0,0,0)',
            text: String(theme.colors.text),
            card: String(theme.colors.card),
            primary: String(theme.colors.primary),
            notification: String(theme.colors.primary),
            background: String(theme.colors.background),
        },
    };

    return (
        <ThemeProvider theme={theme} setTheme={setTheme}>
            <NavigationContainer theme={navigationTheme}>
                <Menu/>
            </NavigationContainer>
        </ThemeProvider>

    );
}
