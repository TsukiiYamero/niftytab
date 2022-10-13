import TabsSection from '@/templates/TabsSection/TabsSection';
import Navbar from '@/ui/organisms/Navbar/Navbar';
import { MainPageWrapper } from './MainPageWrapper.styled';

const MainPage = () => {
    return (
        <MainPageWrapper>
            <Navbar />
            <TabsSection />
        </MainPageWrapper>
    );
};

export default MainPage;
