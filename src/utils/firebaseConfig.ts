import {initializeApp} from "firebase/app"
import {getDatabase} from  "firebase/database"
import Constants from "expo-constants";

const {
    firebaseApiKey,
    firebaseAuthDomain,
    firebaseDatabaseUrl,
    firebaseProjectId,
    firebaseStorageBucket,
    firebaseMessagingSenderId,
    firebaseAppId,
    firebaseMeasurementId
} = Constants.expoConfig?.extra
console.log(firebaseApiKey, firebaseDatabaseUrl)
const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: firebaseAuthDomain,
    databaseURL: firebaseDatabaseUrl,
    projectId: firebaseProjectId,
    storageBucket: firebaseStorageBucket,
    messagingSenderId: firebaseMessagingSenderId,
    appId: firebaseAppId,
    measurementId: firebaseMeasurementId
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
