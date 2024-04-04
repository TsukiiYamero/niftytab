import Home from '@/pages/Home/Home';
import { Suspend } from '@/pages/Suspend';
import { HomeRoute, SaveTabsRoute, SuspendRoute } from '@/utils';
import { createMemoryRouter } from 'react-router-dom';

const Routes = createMemoryRouter([{
    path: HomeRoute,
    element: <Home />,
    index: true
}, {
    path: SuspendRoute,
    element: <Suspend />
}, {
    path: SaveTabsRoute,
    element: <Home />
}
]);

export default Routes;
