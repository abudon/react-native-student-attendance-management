import React, {createContext, useContext} from 'react';
import {light} from '../constants/';
import {ITheme, IThemeProvider} from '../constants/types';

// CREATING THE THEME CONTEXT
export const ThemeContext = createContext(
    {
        theme: light,
        setTheme: () => {},
    }
)

// PROVIDING THE THEME CONTEXT PROVIDER
export const ThemeProvider = ({
                                  children,
                                  theme = light,
                                  setTheme = () => {},
                              }: IThemeProvider) => {
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

// USE THE THEME CONTEXT
 export default function useTheme():ITheme {
     const {theme} = useContext(ThemeContext);
     return theme
 }
