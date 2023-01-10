import TabsSection from '@/templates/TabsSection/TabsSection';
import Navbar from '@/ui/organisms/Navbar/Navbar';
import { MainPageWrapper } from './MainPageWrapper.styled';
import { MainContent } from '@/templates/MainContent';

const MainPage = () => {
    return (
        <MainPageWrapper>
            <Navbar />
            <TabsSection />
            <MainContent />
        </MainPageWrapper>
    );
};

export default MainPage;
