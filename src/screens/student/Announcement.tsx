import {Blocks, Text} from "../../components";
import {Animated, StyleSheet} from "react-native";
import FlatList = Animated.FlatList;
import {useMessages} from "../../constants/data";
import {usePushNotification} from "../../constants/data/usePushNotification";




export const Announcement = () => {
    const {message} = useMessages()
    const {expoPushToken, notification} = usePushNotification()
    const data = JSON.stringify(notification, undefined, 2)
    console.log(data )
    console.log(expoPushToken?.data)
    const renderItem =({item}:any) => {

        return(
            <Blocks style={styles.messageContainer}>
                    <Text
                        color={'white'}
                        size={18}
                        style={styles.messageText}>{item.text}</Text>
                    <Text
                        size={16}
                        color={'white'}
                        style={styles.timestamp}>{new Date(item.timestamp).toLocaleDateString()}</Text>
            </Blocks>
        )
    }
    return (
        <Blocks
            align={'center'}
            justify={'flex-start'}
            flex={1}
            safe
        >
            <FlatList
                data={message}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id || index.toString()}
                contentContainerStyle={styles.container}
            />
        </Blocks>
    );
};
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    messageContainer: {
        backgroundColor: '#df7040',
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
        borderBottomRightRadius: 0

    },
    messageText: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
    },
    timestamp: {
        fontSize: 15,
        color: '#888',
        textAlign: 'right',
        marginTop: 5,
    },
});

export default Announcement
