import { useEffect } from 'react';
import { AttrThemeName } from '../theme.types';
import { useGetTheme } from './useGetTheme';

export const useSetInitialTheme = () => {
    const userTheme = useGetTheme();

    useEffect(() => {
        document.documentElement.setAttribute(AttrThemeName, userTheme);
    }, [userTheme]);

    return userTheme;
};
