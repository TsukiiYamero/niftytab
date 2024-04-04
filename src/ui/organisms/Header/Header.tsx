import { IconBell, IconUserCircle } from '@tabler/icons-react';
import type { FC } from 'react';

interface MainLayoutProps { textDescription: string, title: string }

export const Header: FC<MainLayoutProps> = ({ textDescription, title }) => {
    return (
        <nav className="flex justify-between items-center h-[70px]">
            <section className='flex flex-col'>
                <h1 className='text-[length:var(--font-size-secondary-title)]'>{title}</h1>
                <p className='text-[length:14px] text-[--neutral-color-alt-primary]'>
                    {textDescription}
                </p>
            </section>

            <div className="flex gap-6">
                <IconBell className='w-[--icons-size-primary] h-[--icons-size-primary] text-[--neutral-color-primary]' />

                <IconUserCircle strokeWidth={2} className='w-[--icons-size-primary] h-[--icons-size-primary] text-[--neutral-color-primary]' />
            </div>
        </nav>
    );
};
