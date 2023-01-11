/* eslint-disable @typescript-eslint/no-unused-vars */
import TabsSection from '@/templates/TabsSection/TabsSection';
import Navbar from '@/ui/organisms/Navbar/Navbar';
import { MainPageWrapper } from './MainPageWrapper.styled';
import { MainContent } from '@/templates/MainContent';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
            <MainContent />
        </MainPageWrapper>
    );
};

export default MainPage;
