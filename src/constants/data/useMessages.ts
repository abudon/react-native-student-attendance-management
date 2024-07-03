import { useEffect, useState } from "react";
import { onValue, ref, push, set } from "firebase/database";
import { database } from "../../utils/firebaseConfig";
import { useAuth } from "../../hooks";
import {IMessages} from "../types";

export default () => {
    const user = useAuth();
    const [message, setMessage] = useState<IMessages[]>([]);







    const getMessage = async () => {
        const messagesReference = ref(database, `messages/${user.userid.toUpperCase()}`);
        onValue(messagesReference, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();

                // Transforming data into an array of messages
                const transformedData = Object.keys(data).map(key => ({
                    Id: key,
                    ...data[key]
                }));
                setMessage(transformedData);
            }
        });
    };

    useEffect(() => {
        getMessage().then(() => console.log("success in getting messages"));
    }, []);

    return {
        message
    };
};
