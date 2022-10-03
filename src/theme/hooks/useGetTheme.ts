import { useEffect, useState } from "react"
import { getThemeFromStorage } from "../helpers/getThemeFromStorage";
import { setThemeInStorage } from "../helpers/setThemeInStorage";
import { Themes } from "../theme.types";
import { usePrefersColorScheme } from "./usePrefersColorScheme";

export const useGetTheme = () => {
    const themePrefer = usePrefersColorScheme();
    const [theme, setTheme] = useState<Themes>(Themes.dark);

    useEffect(() => {

        const getThemeFromSync = async () => {
            if (!chrome.storage) return;

            const { existError, themeStored } = await getThemeFromStorage();

            if (!existError && themeStored) {
                setTheme(themeStored);
                return;
            }

            if (!themeStored) {
                setThemeInStorage(themePrefer);
            }
        }

        getThemeFromSync();

    }, [])

    return theme;
}