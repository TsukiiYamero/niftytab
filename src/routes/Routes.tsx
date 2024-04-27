import Home from '@/pages/Home/Home';
import { SaveTabs } from '@/pages/SaveTabs';
import { ShowTabs } from '@/pages/ShowTabs';
import { Suspend } from '@/pages/Suspend';
import { HomeRoute, SaveTabsRoute, ShowTabsRoute, SuspendRoute } from '@/utils';
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
        path: ShowTabsRoute,
        element: <ShowTabs />
    }, {
        path: SaveTabsRoute,
        element: <SaveTabs />
    }]
}
], { initialEntries: [`${HomeRoute}${SuspendRoute}`] });

export default Routes;
