import { AuthProvider } from '@/contexts/auth';
import { AuthModalProvider } from '@/contexts/authModal';
import { UserNoAuthenticatedMessage } from '@/ui/molecules/UserNotAuthenticatedMessage';
import { useGetTabsLocal } from './customHooks/tabs';
import { Button } from '@nextui-org/react';
/* import { TabsProvider } from './contexts/tabs';
import { SnackbarProvider } from './contexts/snackbar/provider';
import { CustomThemeProvider } from './theme/provider/CustomThemeProvider'; */
/* import { MainRouter } from './routes/MainRouter'; */

export const App = () => {
    const { local } = useGetTabsLocal();
    console.log(local);

    const putTabsToSleep = async () => {
        /* chrome.tabs.discard({}, function (tabs) {
            tabs.forEach((tab) => {
                chrome.tabs.update(tab.id, { active: false });
            });
        }); */
    };

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

                <Button variant="flat" color="primary" onClick={putTabsToSleep}>
                </Button>
            </AuthModalProvider>
        </AuthProvider>
    );
};

export default App;
