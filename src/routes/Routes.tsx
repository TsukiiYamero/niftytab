import Home from '@/pages/Home/Home';
import { SaveTabs } from '@/pages/SaveTabs';
import { Suspend } from '@/pages/Suspend';
import { HomeRoute, SaveTabsRoute, SuspendRoute } from '@/utils';
import { createMemoryRouter } from 'react-router-dom';

const Routes = createMemoryRouter([{
    path: HomeRoute,
    element: <Home />,
    errorElement: <>Error no page found</>,
    children: [{
        index: true,
        path: SuspendRoute,
        element: <Suspend />
    }, {
        path: SaveTabsRoute,
        element: <SaveTabs />
    }]
}
], { initialEntries: [`${HomeRoute}${SuspendRoute}`] });

export default Routes;
