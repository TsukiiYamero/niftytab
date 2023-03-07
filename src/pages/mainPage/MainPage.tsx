import TabsSection from '@/templates/TabsSection/TabsSection';
import Navbar from '@/ui/organisms/Navbar/Navbar';
import { MainPageWrapper } from './MainPageWrapper.styled';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/tabs/local');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MainPageWrapper>
            <Navbar />
            <TabsSection />
            <Outlet />
        </MainPageWrapper>
    );
};

export default MainPage;
