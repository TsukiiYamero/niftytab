import { SideBar } from '@/ui/molecules/SideBar';
import type { FC } from 'react';
import './main_layout.css';

export const MainLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className='main-layout'>
            <SideBar />

            <main>
                {children}
            </main>
        </div>
    );
};
