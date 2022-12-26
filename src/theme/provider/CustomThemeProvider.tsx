/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, useMemo, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeContext } from '../context/themeContext';
import { Themes } from '../theme.types';
import { useGetInitialTheme } from '../hooks/useGetInitialTheme';
import { useApplyTheme } from '../hooks/useApplyTheme';
import { getDesignTokens } from '../helpers/getDesignTokens';

type props = {
    children: ReactNode;
};

/**
 * Provider to Apply theme and MUI theme
 * and for avoid too much code in app.tsx
 */
export const CustomThemeProvider = ({ children }: props) => {
    const initialTheme = useGetInitialTheme();
    const [theme, setTheme] = useState<Themes>(initialTheme);
    useApplyTheme({ initialTheme, theme, setTheme });
    const themeMui = useMemo(() => createTheme(getDesignTokens(theme)), [theme]);

    return (<>
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <ThemeProvider theme={themeMui}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    </>
    );
};
