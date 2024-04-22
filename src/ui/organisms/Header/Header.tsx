import { IconBell, IconUserCircle } from '@tabler/icons-react';
import type { FC } from 'react';

export const Header: FC = () => {
    return (
        <nav className="flex justify-between items-center h-[60px]">
            <section className='flex flex-col'>
                <h1 className='text-[length:var(--font-size-secondary-title)] font-bold'>NiftyTab</h1>
            </section>

            <div className="flex gap-6">
                <IconBell className='w-[--icons-size-primary] h-[--icons-size-primary] text-[--neutral-color-primary]' />

                <IconUserCircle strokeWidth={2} className='w-[--icons-size-primary] h-[--icons-size-primary] text-[--neutral-color-primary]' />
            </div>
        </nav>
    );
};
