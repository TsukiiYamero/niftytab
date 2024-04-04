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
                <div className="rounded bg-slate-400 w-7 h-7">
                </div>

                <div className="rounded bg-slate-400 w-7 h-7">
                </div>
            </div>
        </nav>
    );
};
