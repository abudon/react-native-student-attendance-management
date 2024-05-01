
import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import Storage from '@react-native-async-storage/async-storage';
import {
    IUser,
    IUseData,
    ITheme,
} from '../constants/types';

import {
    USERS,
} from '../constants/mocks';

import {light} from '../constants';



export const DataContext = createContext({});


export const DataProvider = ({children}: {children: React.ReactNode}) => {
    const [isDark, setIsDark] = useState(false);
    const [theme, setTheme] = useState<ITheme>(light);
    const [user, setUser] = useState<IUser>(USERS[0]);
    const [users, setUsers] = useState<IUser[]>(USERS);


    // get isDark mode from storage
    const getIsDark = useCallback(async () => {
        // get preferance gtom storage
        const isDarkJSON = await Storage.getItem('isDark');

        if (isDarkJSON !== null) {
            // set isDark / compare if has updated
            setIsDark(JSON.parse(isDarkJSON));
        }
    }, [setIsDark]);

    // handle isDark mode
    const handleIsDark = useCallback(
        (payload: boolean) => {
            // set isDark / compare if has updated
            setIsDark(payload);
            // save preferance to storage
            Storage.setItem('isDark', JSON.stringify(payload));
        },
        [setIsDark],
    );

    // handle users / profiles
    const handleUsers = useCallback(
        (payload: IUser[]) => {
            // set users / compare if has updated
            if (JSON.stringify(payload) !== JSON.stringify(users)) {
                setUsers({...users, ...payload});
            }
        },
        [users, setUsers],
    );

    // handle user
    const handleUser = useCallback(
        (payload: IUser) => {
            // set user / compare if has updated
            if (JSON.stringify(payload) !== JSON.stringify(user)) {
                setUser(payload);
            }
        },
        [user, setUser],
    );

    // handle Article


    // get initial data for: isDark & language
    useEffect(() => {
        getIsDark();
    }, [getIsDark]);

    // change theme based on isDark updates
    useEffect(() => {
        setTheme(isDark ? light : light);
    }, [isDark]);

    const contextValue = {
        isDark,
        handleIsDark,
        theme,
        setTheme,
        user,
        users,
        handleUsers,
        handleUser,
    };

    return (
        <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
    );
};

export const useData = () => useContext(DataContext) as IUseData;
