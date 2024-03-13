import { AuthProvider } from '@/contexts/auth';
import { AuthModalProvider } from '@/contexts/authModal';
import { UserNoAuthenticatedMessage } from '@/ui/molecules/UserNotAuthenticatedMessage';
/* import { TabsProvider } from './contexts/tabs';
import { SnackbarProvider } from './contexts/snackbar/provider';
import { CustomThemeProvider } from './theme/provider/CustomThemeProvider'; */
/* import { MainRouter } from './routes/MainRouter'; */

export const App = () => {
    return (
        <AuthProvider>
            {/* <CustomThemeProvider>
                <SnackbarProvider>
                    <TabsProvider>
                        <AuthModalProvider>
                            <MainRouter />
                        </AuthModalProvider>
                    </TabsProvider>
                </SnackbarProvider>
            </CustomThemeProvider> */}
            <AuthModalProvider>
                < UserNoAuthenticatedMessage />
            </AuthModalProvider>
        </AuthProvider>
    );
};

export default App;
