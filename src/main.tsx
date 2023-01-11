import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider
} from 'react-router-dom';
import { ErrorPage } from './pages/ErrorPage';
import { TabsLocalTemplate, TabsCloudTemplate, TabsTemplate } from './templates/TabsTemplate';
import { SessionsCloudTemplate, SessionsTemplate } from './templates/SessionsTemplate';
import { CloudStore } from './utils/niftyDefaults';
import { LocalStore } from '@/utils/niftyDefaults';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
