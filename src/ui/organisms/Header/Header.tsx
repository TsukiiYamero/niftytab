import { SettingsContext } from '@/contexts/Settings';
import { SaveTabsRoute, ShowTabsRoute, SuspendRoute } from '@/utils';
import { Button } from '@nextui-org/react';
import { IconSettings, IconUserCircle } from '@tabler/icons-react';
import { useContext, type FC } from 'react';
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

export const Header: FC = () => {
    const { openSettings } = useContext(SettingsContext);

    const handleOpenModal = () => { openSettings(); };

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
                            <NavLink to={path} className={({ isActive }) => `${isActive ? 'item-active' : ''} text-[0.8125rem] text-[var(--neutral-color-alt-primary)]`}>
                                {title}
                            </NavLink>
                        </li>
                    ))
                }
            </ul>

            <div className="flex gap-2">
                <Button isIconOnly size='sm' variant='light' onClick={handleOpenModal}>
                    <IconSettings className='w-[--icons-size-primary] h-[--icons-size-primary] text-[--neutral-color-alt-primary]' />
                </Button>

                <Button isIconOnly size='sm' variant='light' >
                    <IconUserCircle strokeWidth={2} className='w-[--icons-size-primary] h-[--icons-size-primary] text-[--neutral-color-alt-primary]' />
                </Button>
            </div>
        </nav>
    );
};
