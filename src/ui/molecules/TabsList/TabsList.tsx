import type { FC } from 'react';

import { useGetAllTabs } from '@/customHooks/tabs';

export const TabsList: FC<{ className: string }> = ({ className }) => {
    const { tabs } = useGetAllTabs();

    return (
        <ul className={`flex flex-col gap-2 overflow-x-hidden ${className}`}>
            {
                tabs.map((tab) =>
                    <li className='flex gap-1 items-center' key={tab.id}>
                        <img src={tab.favIconUrl} alt={tab.title} className='w-4 h-4' />

                        <div className='flex flex-col overflow-hidden pl-1'>
                            <p className='text-[length:12px] whitespace-nowrap' title={tab.title} >{tab.title}</p>
                            <p className='text-[length:var(--font-size-small)] whitespace-nowrap' title={tab.url} >{tab.url}</p>
                        </div>
                    </li>
                )
            }
        </ul>
    );
};
