import Home from '@/pages/Home/Home';
import { HomeRoute, SaveTabsRoute, SuspendRoute } from '@/utils';
import { createBrowserRouter } from 'react-router-dom';

const Routes = createBrowserRouter([{
    path: HomeRoute,
    element: <Home />,
    index: true
}, {
    path: SuspendRoute,
    element: <Home />
}, {
    path: SaveTabsRoute,
    element: <Home />
}
]);

export default Routes;
