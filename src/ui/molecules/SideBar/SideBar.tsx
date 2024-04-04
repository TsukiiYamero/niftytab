import { HomeRoute, SaveTabsRoute, SuspendRoute } from '@/utils';
import { IconHome, IconBrandSpeedtest, IconInbox } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';

const itemsMenu = [{
    title: 'Home',
    path: HomeRoute,
    icon: <IconHome className='w-[--icons-size-primary] h-[--icons-size-primary] text-[--neutral-color-primary]' />
}, {
    title: 'Suspend Tabs',
    path: SuspendRoute,
    icon: <IconBrandSpeedtest className='w-[--icons-size-primary] h-[--icons-size-primary] text-[--neutral-color-primary]' />
}, {
    title: 'Save Tabs',
    path: SaveTabsRoute,
    icon: <IconInbox className='w-[--icons-size-primary] h-[--icons-size-primary] text-[--neutral-color-primary]' />
}];

export const SideBar = () => {
    return (
        <nav aria-label="Sidebar Menu" className='w-[60px] h-full flex flex-col gap-14 pt-[var(--top-space-layout)] border-r-2 border-[#cdcdcd4f]'>
            <div className='flex justify-center'>
                X
            </div>

            <ul id='sidebar' className='flex flex-col items-center gap-8'>
                {
                    itemsMenu.map((item) => (
                        <li key={item.title} className='p-[6px] rounded-full'>
                            <NavLink to={item.path}>
                                {item.icon}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};
