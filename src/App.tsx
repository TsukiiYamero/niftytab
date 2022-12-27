import './App.css';
import MainPage from './pages/mainPage/MainPage';
import { AuthProvider } from './contexts/auth';
import { TabsProvider } from './contexts/tabs';
import { SnackbarProvider } from './contexts/snackbar/provider';
import { CustomThemeProvider } from './theme/provider/CustomThemeProvider';
import { AuthModalProvider } from './contexts/authModal';

export const App = () => {
    return (
        <AuthProvider>
            <AuthModalProvider>
                <CustomThemeProvider>
                    <TabsProvider>
                        <SnackbarProvider>
                            <MainPage />
                        </SnackbarProvider>
                    </TabsProvider>
                </CustomThemeProvider>
            </AuthModalProvider>
        </AuthProvider>
    );
};

export default App;
