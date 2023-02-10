import {
    createMemoryRouter,
    RouterProvider
} from 'react-router-dom';
import { ErrorPage } from '@/pages/ErrorPage';
import { TabsLocalTemplate, TabsCloudTemplate, TabsTemplate } from '@/templates/TabsTemplate';
import { SessionsCloudTemplate, SessionsTemplate } from '@/templates/SessionsTemplate';
import { LocalStore, CloudStore } from '@/utils/niftyDefaults';
import MainPage from '@/pages/mainPage/MainPage';

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
    }
]);

export const MainRouter = () => {
    return (
        <RouterProvider router={router} />
    );
};
