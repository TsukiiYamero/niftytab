import { AuthProvider } from './contexts/auth';
/* import { TabsProvider } from './contexts/tabs';
import { SnackbarProvider } from './contexts/snackbar/provider';
import { CustomThemeProvider } from './theme/provider/CustomThemeProvider';
import { AuthModalProvider } from './contexts/authModal';
import { MainRouter } from './routes/MainRouter'; */

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
            <p className='text-3xl font-bold'>
                Testeando ANdo
            </p>
        </AuthProvider>
    );
};

export default App;
