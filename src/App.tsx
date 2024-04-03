import { AuthProvider } from '@/contexts/auth';
import { AuthModalProvider } from '@/contexts/authModal';
import { UserNoAuthenticatedMessage } from '@/ui/molecules/UserNotAuthenticatedMessage';
import { useGetTabsLocal } from '@/customHooks/tabs/useGetTabsLocal';
import { Button } from '@nextui-org/react';

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
            <AuthModalProvider>
                < UserNoAuthenticatedMessage />

                <Button variant="flat" color="primary" onClick={putTabsToSleep}>
                </Button>
            </AuthModalProvider>
        </AuthProvider>
    );
};

export default App;
