import Home from '@/pages/Home/Home';
import { createBrowserRouter } from 'react-router-dom';

const Routes = createBrowserRouter([{
    element: <Home />,
    path: '/',
    index: true
}]);

export default Routes;
