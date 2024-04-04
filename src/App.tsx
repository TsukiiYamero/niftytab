import { AuthProvider } from '@/contexts/auth';
import { AuthModalProvider } from '@/contexts/authModal';
import { RouterProvider } from 'react-router-dom';
import Routes from '@/routes/Routes';

export const App = () => {
    return (
        <AuthProvider>
            <AuthModalProvider>
                <div className='w-[var(--width-app)] h-[var(--height-app)]'>
                    <RouterProvider router={Routes} />
                </div>
            </AuthModalProvider>
        </AuthProvider>
    );
};

export default App;
