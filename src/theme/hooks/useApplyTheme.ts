import { useEffect } from 'react';
import { AttrThemeName, Themes } from '../theme.types';
import { useListenPrefersChange } from './useListenPrefersChange';

type Props = {
    initialTheme: Themes,
    theme: Themes,
    setTheme: (theme: Themes) => void,
}

/**
 * useEffects to apply theme changes and avoid useEffects in Principal Components
 */
export const useApplyTheme = ({ initialTheme = Themes.dark, theme = Themes.dark, setTheme }: Props) => {
    const themePrefer = useListenPrefersChange();

    useEffect(() => setTheme(initialTheme), [initialTheme, setTheme]);

    useEffect(() => setTheme(themePrefer), [setTheme, themePrefer]);

    useEffect(() => {
        const newTheme = theme === Themes.dark ? Themes.dark : Themes.light;
        document.documentElement.setAttribute(AttrThemeName, newTheme);
    }, [theme]);

    return theme;
};
