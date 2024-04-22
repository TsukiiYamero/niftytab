import Home from '@/pages/Home/Home';
import { Suspend } from '@/pages/Suspend';
import { HomeRoute, SaveTabsRoute, SuspendRoute } from '@/utils';
import { createMemoryRouter } from 'react-router-dom';

const Routes = createMemoryRouter([{
    path: HomeRoute,
    element: <Home />,
    children: [{
        index: true,
        path: SuspendRoute,
        errorElement: <>Error no page found</>,
        element: <Suspend />
    }, {
        path: SaveTabsRoute,
        element: <Home />
    }]
}
], { initialEntries: [`${HomeRoute}${SuspendRoute}`] });

export default Routes;
