import { ChromeStoredTheme, Themes } from '../theme.types';

export const setThemeInStorage = (theme: Themes) => {
    if (!theme) return;

    localStorage.setItem(ChromeStoredTheme, theme);
};
