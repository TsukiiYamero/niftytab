import { ChromeStoredTheme, Themes } from "../theme.types";

export const setThemeInStorage = (theme: Themes) => {
    if (!theme) return;

    chrome.storage?.sync.set({ [ChromeStoredTheme]: theme },
        () => console.log('theme saved'))
}
