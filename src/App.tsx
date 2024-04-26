import { AuthProvider } from '@/contexts/auth';
import { AuthModalProvider } from '@/contexts/authModal';
import { RouterProvider } from 'react-router-dom';
import { SettingsProvider } from '@/contexts/Settings/provider';
import Routes from '@/routes/Routes';

export const App = () => {
    return (
        <AuthProvider>
            <AuthModalProvider>
                <SettingsProvider>
                    <div className='w-[var(--width-app)] h-[var(--height-app)]'>
                        <RouterProvider router={Routes} />
                    </div>
                </SettingsProvider>
            </AuthModalProvider>
        </AuthProvider>
    );
};

export default App;
