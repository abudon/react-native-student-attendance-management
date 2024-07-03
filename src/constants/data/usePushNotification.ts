import {useEffect, useRef, useState} from "react";
import {Platform} from "react-native";
import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";
import {addNotificationResponseReceivedListener, AndroidImportance} from "expo-notifications";
import Constants from "expo-constants";

export interface IPushNotification {
    notification?: Notifications.Notification;
    expoPushToken?: Notifications.ExpoPushToken;
}



export const usePushNotification = () : IPushNotification => {

    Notifications.setNotificationHandler({
        handleNotification: async () =>({
            shouldPlaySound: true,
            shouldShowAlert: true,
            shouldSetBadge: true
        })

    })

    const [expoPushToken, setExpoPushToken] = useState<
                    Notifications.ExpoPushToken | undefined>();
    const [notification, setNotification] = useState<Notifications.Notification | undefined>();

    const notificationListener = useRef<Notifications.Subscription>()
    const responseListener = useRef<Notifications.Subscription>()

    async function registerForPushNotificationAsyn() {
        let token;
        if (Device.isDevice){
            const {status : existingStatus} = await Notifications.requestPermissionsAsync()
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted'){
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status
            }
            if (finalStatus !== 'granted'){
                alert("Failed to get push token")
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas?.projectId,
            }));

            if (Platform.OS === 'android'){
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#ff231f7c',
                    showBadge: true,
                    sound: 'default'
                })
            } else {
                console.log('Must use physical device for Push Notifications');
            }

            return token

        }else  {
            console.log('Use A physical device')
        }
    }


    useEffect(() => {
        registerForPushNotificationAsyn().then((token)=>{
            setExpoPushToken(token);})

        notificationListener.current = Notifications.addNotificationReceivedListener((notification)=>{
            setNotification(notification)
        })

        responseListener.current = addNotificationResponseReceivedListener((response)=>{
            console.log(response)
        })

    return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current!
            )

        Notifications.removeNotificationSubscription(
            responseListener.current!
        )
    }


    }, []);



    return {
    expoPushToken,
        notification
    }
}
