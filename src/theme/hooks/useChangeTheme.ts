import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/themeContext";
import { setThemeInStorage } from "../helpers/setThemeInStorage";
import { AttrThemeName, Themes } from "../theme.types";

export const useChangeTheme = () => {

    const { userTheme } = useContext(ThemeContext);
    const [theme, setTheme] = useState<Themes>(userTheme);

    useEffect(() => {
        userTheme && setTheme(userTheme);
    }, [userTheme])

    useEffect(() => {
        if (!theme) return;

        const newTheme = theme === Themes.dark ? Themes.dark : Themes.light;
        document.documentElement.setAttribute(AttrThemeName, newTheme);

    }, [theme])

    const changeTheme = (isDark: boolean) => {
        const newTheme = isDark ? Themes.dark : Themes.light;
        setThemeInStorage(newTheme);
        setTheme(newTheme);
    };

    return {
        darkTheme: theme === Themes.dark,
        changeTheme
    };
}