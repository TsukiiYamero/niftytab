import './App.css';
import { ThemeContext } from './theme/context/themeContext';
import { useSetInitialTheme } from './theme/hooks/useSetInitialTheme';
import MainPage from './pages/mainPage/MainPage';
import { AuthProvider } from './contexts/auth';
import { TabsProvider } from './contexts/tabs';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { getDesignTokens } from './theme/helpers/getDesignTokens';
import { SnackbarProvider } from './contexts/snackbar/provider';

export const App = () => {
    const userTheme = useSetInitialTheme();

    const theme = useMemo(() => createTheme(getDesignTokens(userTheme)), [userTheme]);

    return (
        <AuthProvider>
            <ThemeContext.Provider value={{ userTheme }}>
                <ThemeProvider theme={theme}>
                    <TabsProvider>
                        <SnackbarProvider>
                            <MainPage />
                        </SnackbarProvider>
                    </TabsProvider>
                </ThemeProvider>
            </ThemeContext.Provider>
        </AuthProvider>
    );
};

export default App;
