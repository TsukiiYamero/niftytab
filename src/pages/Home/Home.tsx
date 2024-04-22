import { Header } from '@/ui/organisms/Header';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div className='h-full'>
            <header>
                <Header />
                <>Tab Selection</>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Home;
