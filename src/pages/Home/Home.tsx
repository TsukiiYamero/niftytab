import { Header } from '@/ui/organisms/Header';
import { SuspendRoute } from '@/utils';
import { Tab, Tabs } from '@nextui-org/react';
import { Outlet, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-col h-full'>
            <header className='h-[60px]'>
                <Header />
            </header>

            <div className='flex flex-col overflow-auto'>
                <div className='flex flex-col items-center gap-3'>
                    <p className='text-[--neutral-color-alt-primary] text-[length:var(--font-size-table-content)]'>Want more features?</p>

                    <Tabs aria-label="Options" onSelectionChange={() => { navigate(SuspendRoute); }} defaultSelectedKey={'suspend'}>
                        <Tab key="suspend" title="Suspend">

                        </Tab>

                        <Tab key="saveTabs" title="Save Tabs">

                        </Tab>
                    </Tabs>
                </div>

                <main className='h-full py-4'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Home;
