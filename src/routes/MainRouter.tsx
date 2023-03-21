import {
    createMemoryRouter,
    RouterProvider
} from 'react-router-dom';
import { ErrorPage } from '@/pages/ErrorPage';
import { CloudStore, LocalStore, SearchPath } from '@/utils/niftyDefaults';
import MainPage from '@/pages/mainPage/MainPage';
import { SettingsPage } from '@/pages/Settings';
import { AccountInfo, Password } from '@/ui/molecules/Settings';
import { SessionsCloudTemplate, SessionsTemplate, TabsCloudTemplate, TabsLocalTemplate, TabsTemplate } from '@/templates/MainTemplates';
import { SearchSessionsTemplate, SearchTabsTemplate } from '@/templates/SearchTemplates';

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
                    }, {
                        path: '',
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
            },
            {
                path: `tabs/${SearchPath}`,
                element: <SearchTabsTemplate />
            }, {
                path: `sessions/${SearchPath}`,
                element: <SearchSessionsTemplate />
            }
        ]
    }, {
        path: '/settings',
        element: <SettingsPage />,
        errorElement: <ErrorPage />,
        children: [{
            path: 'account',
            element: <AccountInfo />
        }, {
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
