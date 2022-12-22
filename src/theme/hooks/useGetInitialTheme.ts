import { useEffect, useState } from 'react';
import { getThemeFromStorage } from '../helpers/getThemeFromStorage';
import { Themes } from '../theme.types';
import { usePrefersColorScheme } from './usePrefersColorScheme';
import { setThemeInStorage } from '../helpers/setThemeInStorage';

/**
 * Get The initial Theme saved
 * if is not in local storage themePreferScheme will be used instead
 */
export const useGetInitialTheme = () => {
    const themePrefer = usePrefersColorScheme();
    const [theme, setTheme] = useState<Themes>(Themes.dark);

    useEffect(() => {
        const getTheme = () => {
            const { existError, themeStored } = getThemeFromStorage();

            if (!existError && themeStored) {
                setTheme(themeStored);
                return;
            }

            if (!themeStored) {
                setTheme(themePrefer);
                setThemeInStorage(themePrefer);
            }
        };

        getTheme();
    }, [themePrefer]);

    return theme;
};
