import {initializeApp} from "firebase/app"
import {getDatabase} from  "firebase/database"
import 'firebase/auth'




const firebaseConfig = {
    apiKey: "AIzaSyC9hcIUcBzB4h_LXbq0FNr4XI7Op1xIp54",
    authDomain: "fortvilleacademy-2ece7.firebaseapp.com",
    databaseURL: "https://fortvilleacademy-2ece7-default-rtdb.firebaseio.com",
    projectId: "fortvilleacademy-2ece7",
    storageBucket: "fortvilleacademy-2ece7.appspot.com",
    messagingSenderId: "77678406232",
    appId: "1:77678406232:web:0c1e97b86d22f033f7f82d",
    measurementId: "G-S8SXXKSRSV"
}



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
