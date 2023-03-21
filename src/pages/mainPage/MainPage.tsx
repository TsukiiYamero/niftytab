import TabsSection from '@/templates/TabsSection/TabsSection';
import Navbar from '@/ui/organisms/Navbar/Navbar';
import { MainPageWrapper } from './MainPageWrapper.styled';
import { Outlet } from 'react-router-dom';
import { useNavigateToLocal } from '@/customHooks/routes/useNavigateToLocalAndSaved';

const MainPage = () => {
    useNavigateToLocal();

    return (
        <MainPageWrapper>
            <Navbar />
            <TabsSection />
            <Outlet />
        </MainPageWrapper>
    );
};

export default MainPage;
