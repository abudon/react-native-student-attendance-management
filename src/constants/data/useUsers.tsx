import { useEffect, useState } from "react";
import { database } from "../../utils/firebaseConfig";
import { ref, onValue } from 'firebase/database';
import {IFIreBaseUsers} from "../types";

const useUsers  = () => {

    const [users, setUsers] = useState<IFIreBaseUsers[]>([]);
    const [admin, setAdmin] = useState<IFIreBaseUsers[]>([])

    const getUsers = async () => {
        const usersDatabaseReference = ref(database, "users/");

        onValue(usersDatabaseReference, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const transformedData: IFIreBaseUsers[] = [];

                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const values = data[key];
                        const transformItem: IFIreBaseUsers = {
                            userid: key,
                            fullname: `${values.firstName.toUpperCase()} ${values.lastName.toUpperCase()}`,
                            grade: values.grade,
                            gender: values.gender,
                            dateOfBirth: values.dateOfBirth,
                            email: values.email,
                            contact: values.contact,
                            address: values.address,
                            parentName: values.parentName,
                            password: values.password,
                            emergencyContact: values.emergencyContact,
                            subjectTaught: values.subjectTaught,
                            highestQualification: values.highestQualification,
                            medic: values.medicalInformation,
                            type: values.type,
                        };
                        transformedData.push(transformItem);
                    }
                }
                setUsers(transformedData);
            }
        });
    };

    const getAdmin = async ()=> {
        const adminDatabaseReference = ref(database, "admin/");

        onValue(adminDatabaseReference, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const transformedData: IFIreBaseUsers[] = [];

                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const values = data[key];
                        const transformItem: IFIreBaseUsers = {
                            userid: key,
                            fullname: `${values.firstName.toUpperCase()} ${values.lastName.toUpperCase()}`,
                            grade: values.grade,
                            gender: values.gender,
                            dateOfBirth: values.dateOfBirth,
                            email: values.email,
                            contact: values.contact,
                            address: values.address,
                            parentName: values.parentName,
                            password: values.password,
                            emergencyContact: values.emergencyContact,
                            subjectTaught: values.subjectTaught,
                            highestQualification: values.highestQualification,
                            medic: values.medicalInformation,
                            type: values.type,
                        };
                        transformedData.push(transformItem);
                    }
                }
                setAdmin(transformedData);
            }
        });
    }

    useEffect(() => {
        getAdmin().then(() => console.log("success getting Admin"));
        getUsers().then(() => console.log("success getting User"));
    }, []);


    return{users, admin}

};

export default useUsers
