import { createContext } from 'react';
import { Themes } from '../theme.types';

type ThemeContextType = {
    userTheme: Themes;
};

export const ThemeContext = createContext<ThemeContextType>({
    userTheme: Themes.dark
});
