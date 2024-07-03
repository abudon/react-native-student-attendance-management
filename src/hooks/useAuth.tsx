import React, { createContext, useContext, useState } from 'react';
import { ILogIn } from "../constants/types";

interface IAuthContext {
    user: ILogIn;
    setUser: React.Dispatch<React.SetStateAction<ILogIn>>;
}

export const AuthContext = createContext<IAuthContext>({
    user: {
        userid: '',
        password: '',
        role: "",
        grade: '',
        department: ''
    },
    setUser: () => {}
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<ILogIn>({
        userid: '',
        password: '',
        role: "",
        grade: "",
        department: ""
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): ILogIn => {
    const { user, setUser } = useContext(AuthContext);
    return user;
};
