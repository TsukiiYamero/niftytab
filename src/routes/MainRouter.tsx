import {
    createMemoryRouter,
    RouterProvider
} from 'react-router-dom';
import { ErrorPage } from '@/pages/ErrorPage';
import { TabsLocalTemplate, TabsCloudTemplate, TabsTemplate } from '@/templates/TabsTemplate';
import { SessionsCloudTemplate, SessionsTemplate } from '@/templates/SessionsTemplate';
import { LocalStore, CloudStore } from '@/utils/niftyDefaults';
import MainPage from '@/pages/mainPage/MainPage';
import { SettingsPage } from '@/pages/Settings';
import { Password } from '@/ui/molecules/Settings';

const router = createMemoryRouter([
    {
        path: '/',
        element: <MainPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'tabs',
                element: <TabsTemplate />,
                children: [
                    {
                        path: LocalStore,
                        element: <TabsLocalTemplate />
                    },
                    {
                        path: CloudStore,
                        element: <TabsCloudTemplate />
                    }
                ]
            }, {
                path: 'sessions',
                element: <SessionsTemplate />,
                children: [
                    {
                        path: CloudStore,
                        element: <SessionsCloudTemplate />
                    }
                ]
            }
        ]
    }, {
        path: '/settings',
        element: <SettingsPage />,
        errorElement: <ErrorPage />,
        children: [{
            path: 'password',
            element: <Password />
        }]
    }
]);

export const MainRouter = () => {
    return (
        <RouterProvider router={router} />
    );
};
