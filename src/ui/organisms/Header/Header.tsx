import { SaveTabsRoute, ShowTabsRoute, SuspendRoute } from '@/utils';
import { Button } from '@nextui-org/react';
import { IconUserCircle } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';
import { Logo } from '@/ui/atoms/svgs';

const Routes = [{
    path: SuspendRoute,
    title: 'Suspend'
}, {
    path: ShowTabsRoute,
    title: 'Show Tabs'
}, {
    path: SaveTabsRoute,
    title: 'Save Tabs'
}];

export const Header = () => {
    return (
        <nav className="flex justify-between items-center px-4">
            <div className='flex items-center'>
                <Logo className={'w-[36px] h-[36px]'} />
                <p className='text-[length:var(--font-size-tiny)]'>NiftyTab</p>
            </div>

            <ul className='flex items-center gap-1'>
                {
                    Routes.map(({ path, title }) => (
                        <li key={title} className={'item-menu flex'}>
                            <NavLink to={path} className={({ isActive }) => `${isActive ? 'item-active' : ''} text-[14px] text-[var(--neutral-color-alt-primary)]`}>
                                {title}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>

            <div className="flex gap-2">

                <Button isIconOnly size='sm' variant='light' >
                    <IconUserCircle strokeWidth={2} className='w-[--icons-size-primary] h-[--icons-size-primary] text-[--neutral-color-alt-primary]' />
                </Button>
            </div>
        </nav>
    );
};
