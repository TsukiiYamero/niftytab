import { createContext } from 'react';
import { Themes } from '../theme.types';

type ThemeContextType = {
    theme: Themes;
    setTheme: (theme: Themes) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
    theme: Themes.dark,
    setTheme: (theme: Themes) => { }
});
