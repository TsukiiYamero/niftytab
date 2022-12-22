import { useEffect, useState } from 'react';
import { Themes } from '../theme.types';

/**
 * Update every time that the user changes their preferred color scheme
 */
export const useListenPrefersChange = () => {
    const [value, setValue] = useState(true);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setValue(mediaQuery.matches);

        const handler = () => setValue(mediaQuery.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return value ? Themes.dark : Themes.light;
};
