import TabsSection from '@/templates/TabsSection/TabsSection';
import Navbar from '@/ui/organisms/Navbar/Navbar';
/* import { MainPageWrapper } from './MainPageWrapper.styled'; */
import { Outlet } from 'react-router-dom';
import { useNavigateToLocal } from '@/customHooks/routes/useNavigateToLocalAndSaved';

const MainPage = () => {
    useNavigateToLocal();

    return (
        <div>
            <Navbar />
            <TabsSection />
            <Outlet />
        </div>
    );
};

export default MainPage;
