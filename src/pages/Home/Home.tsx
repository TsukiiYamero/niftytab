/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header } from '@/ui/organisms/Header';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex flex-col h-full'>
            <header className='pt-[5px]'>
                <Header />
            </header>

            <div className='grid overflow-auto'>
                <main className='h-full py-4'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Home;
