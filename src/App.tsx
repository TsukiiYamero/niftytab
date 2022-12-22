import './App.css';
import MainPage from './pages/mainPage/MainPage';
import { AuthProvider } from './contexts/auth';
import { TabsProvider } from './contexts/tabs';
import { SnackbarProvider } from './contexts/snackbar/provider';
import { CustomThemeProvider } from './theme/provider/CustomThemeProvider';

export const App = () => {
    return (
        <AuthProvider>
            <CustomThemeProvider>
                <TabsProvider>
                    <SnackbarProvider>
                        <MainPage />
                    </SnackbarProvider>
                </TabsProvider>
            </CustomThemeProvider>
        </AuthProvider>
    );
};

export default App;
