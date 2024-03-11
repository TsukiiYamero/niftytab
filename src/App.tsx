/* import { AuthProvider } from './contexts/auth';
import { TabsProvider } from './contexts/tabs';
import { SnackbarProvider } from './contexts/snackbar/provider';
import { CustomThemeProvider } from './theme/provider/CustomThemeProvider';
import { AuthModalProvider } from './contexts/authModal';
import { MainRouter } from './routes/MainRouter'; */

/* export const App = () => {
    return (
        <AuthProvider>
            <CustomThemeProvider>
                <SnackbarProvider>
                    <TabsProvider>
                        <AuthModalProvider>
                            <MainRouter />
                        </AuthModalProvider>
                    </TabsProvider>
                </SnackbarProvider>
            </CustomThemeProvider>
        </AuthProvider>
    );
}; */
export const App = () => {
    return (
        <div>
            <h1 className="text-5xl font-bold">Testing Tailwind</h1>
        </div>
    );
};

export default App;
