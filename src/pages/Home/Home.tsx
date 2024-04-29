/* eslint-disable @typescript-eslint/no-unused-vars */
import { Header } from '@/ui/organisms/Header';
import { SaveTabsRoute, ShowTabsRoute, SuspendRoute } from '@/utils';
import { Tab, Tabs } from '@nextui-org/react';
import { Outlet, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleOnTabChange = (key: string | number) => {
        if (key === SuspendRoute) navigate(SuspendRoute);

        if (key === ShowTabsRoute) navigate(ShowTabsRoute);

        if (key === SaveTabsRoute) navigate(SaveTabsRoute);
    };

    return (
        <div className='flex flex-col h-full'>
            <header className='h-[60px]'>
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
