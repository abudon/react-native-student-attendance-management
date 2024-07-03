// REACT NATIVE COMPONENTS
import {ColorValue, ImageSourcePropType} from 'react-native';
// MY TYPES
import {ITheme} from './theme';

export * from './theme';
export * from './components'


export interface IUser {
    id: number | string;
    name?: string;
    department?: string;
    avatar?: string;
    stats?: {posts?: number; followers?: number; following?: number};
    social?: {twitter?: string; dribbble?: string};
    about?: string;
}

export interface IUseData {
    isDark: boolean;
    handleIsDark: (isDark?: boolean) => void;
    theme: ITheme;
    setTheme: (theme?: ITheme) => void;
    user: IUser;
    users: IUser[];
    handleUser: (data?: IUser) => void;
    handleUsers: (data?: IUser[]) => void;

}

export interface ILogIn {
    userid: string,
    password: string,
    role?: string,
    grade?: string,
    department?: string
}

export interface ILoginValidation {
    userid: boolean,
    password: boolean,
    role?: boolean

}

 export interface IFIreBaseUsers {
    userid: string;
    fullname: string;
    grade: any;
    gender: any;
    dateOfBirth: any;
    email: any;
    contact: any;
    address: any;
    parentName: any;
    password: any,
    emergencyContact: any;
    subjectTaught: any;
    highestQualification: any;
    medic: any;
    type: any;
}

export interface IAttendance {
    Id: string,
    registrarId: any,
    name: string,
    type: string,
    time: any ,
    check: any,
    contact: any,
}

export interface IMessages {
    id: any,
    text: string,
    timestamp: string
}

export interface IDailyAttendanceItem{
    value: number;
    label: string;
    frontColor?: ColorValue;
}

export interface IStudentReport{
    title: string,
    data: {
        key: string,
        name: string,
        check: string,
        time: string
    }[]
}

export interface ITopAttendance {
    id: string,
    name: string,
    value: number,
    grade?: string
}

export interface IPieData {
    value: number,
    color?: string ,
    text?: string
}
