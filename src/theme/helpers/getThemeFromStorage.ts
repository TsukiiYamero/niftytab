import { ChromeStoredTheme, Themes } from '../theme.types';

type RespThemeFromStorage = {
    existError: boolean;
    themeStored: Themes | '';
};

export const getThemeFromStorage = () => {
    const resp: RespThemeFromStorage = {
        existError: false,
        themeStored: ''
    };

    try {
        const theme = localStorage.getItem(ChromeStoredTheme);
        resp.themeStored = theme as Themes;
    } catch (error) {
        resp.existError = true;
    }

    return resp;
};
