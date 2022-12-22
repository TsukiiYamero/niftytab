import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import { setThemeInStorage } from '../helpers/setThemeInStorage';
import { Themes } from '../theme.types';

/**
 * Custom hook for change the current theme
 * using context to has more control
 */
export const useChangeTheme = () => {
    const { theme: userTheme, setTheme: userSetTheme } = useContext(ThemeContext);

    const changeTheme = (isDark: boolean) => {
        const newTheme = isDark ? Themes.dark : Themes.light;
        setThemeInStorage(newTheme);
        userSetTheme(newTheme);
    };

    return {
        darkTheme: userTheme === Themes.dark,
        changeTheme
    };
};
