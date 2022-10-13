import { ChromeStoredTheme, Themes } from '../theme.types';
import chrome from '@/avoidChromeErrors/chrome';

type RespThemeFromStorage = {
    existError: boolean;
    themeStored: Themes | '';
};

export const getThemeFromStorage = async () => {
    const resp: RespThemeFromStorage = {
        existError: false,
        themeStored: ''
    };

    try {
        const theme = await chrome.storage.sync.get([ChromeStoredTheme]);
        if (theme?.[ChromeStoredTheme])
            resp.themeStored = theme[ChromeStoredTheme];
    } catch (error) {
        resp.existError = true;
    }

    return resp;
};
