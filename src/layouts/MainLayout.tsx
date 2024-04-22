import './main_layout.css';
import type { FC } from 'react';

import { SideBar } from '@/ui/molecules/SideBar';
import { Header } from '@/ui/organisms/Header';

interface MainLayoutProps { children: React.ReactNode, textDescription: string, title: string }

export const MainLayout: FC<MainLayoutProps> = ({ children, textDescription, title }) => {
    return (
        <div className='main-layout'>
            <SideBar />

            <div className='mx-3 pt-1'>
                <Header />

                <main className='main-content my-4'>
                    {children}
                </main>
            </div>
        </div>
    );
};
