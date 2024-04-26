import { SettingsContext } from '@/contexts/Settings';
import { Button } from '@nextui-org/react';
import { IconSettings, IconUserCircle } from '@tabler/icons-react';
import { useContext, type FC } from 'react';

export const Header: FC = () => {
    const { openSettings } = useContext(SettingsContext);

    const handleOpenModal = () => { openSettings(); };

    return (
        <nav className="flex justify-between items-center h-[60px]">
            <section className='flex flex-col'>
                <h1 className='text-[length:var(--font-size-secondary-title)] font-bold'>NiftyTab</h1>
            </section>

            <div className="flex gap-6">
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
