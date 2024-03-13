import { AuthProvider } from './contexts/auth';
import { AuthModalProvider } from './contexts/authModal';
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
                <p className='text-3xl font-bold'>
                    Testeando ANdo
                </p>
            </AuthModalProvider>
        </AuthProvider>
    );
};

export default App;
