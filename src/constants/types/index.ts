// REACT NATIVE COMPONENTS
import {ImageSourcePropType} from 'react-native';
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
    role?: string
}

export interface ILoginValidation {
    userid: boolean,
    password: boolean,
    role?: boolean

}
