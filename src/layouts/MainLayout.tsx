import './main_layout.css';
import type { FC } from 'react';

import { SideBar } from '@/ui/molecules/SideBar';
import { Header } from '@/ui/organisms/Header';

export const MainLayout: FC<{ children: React.ReactNode, titleHeader: string }> = ({ children, titleHeader }) => {
    return (
        <div className='main-layout'>
            <SideBar />

            <div className='mx-5'>
                <Header />

                <main className='main-content'>
                    {children}
                </main>
            </div>
        </div>
    );
};
