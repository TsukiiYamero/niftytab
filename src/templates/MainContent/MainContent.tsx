import { TabsListingsContainer } from '@/ui/organisms/TabsListings';
import { Outlet } from 'react-router-dom';

export const MainContent = () => {
    return (
        <>
            <Outlet />
            <TabsListingsContainer />
        </>
    );
};
