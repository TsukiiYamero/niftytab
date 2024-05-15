/* eslint-disable @typescript-eslint/no-unused-vars */
import { RadialGauge } from '@/ui/atoms/RadialGauge';
import { Logo } from '@/ui/atoms/svgs';
import { bytesToMB, getMemoryInfo } from '@/utils';
import { autoSuspendTabs } from '@/utils/tabs/autoSuspendTabs';
import { Progress, Switch, cn } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export const Suspend = () => {
    const [mbSaved, setMbSaved] = useState(0);
    const [logoColor, setLogoColor] = useState<string>('#f8f8f8');
    const [memoryInUse, setMemoryInUse] = useState(0);

    const handleToggle = async () => {
        /* setIsSelected(value); */
        const { availableCapacity: memoryBefore } = await getMemoryInfo();
        const suspendedTabs = await autoSuspendTabs(3);
        // get info and rest
        if (suspendedTabs === 0) return;

        const { availableCapacity: memoryInfoAft } = await getMemoryInfo();
        const difference = memoryInfoAft - memoryBefore;
        const memoryFree = bytesToMB(difference);
        setLogoColor('#74dfa2');
        setMbSaved(memoryFree);
    };
    /* por ahora no por que nosabemos el uso de los tabs en memoria */
    /*     useEffect(() => {
            const handdleLogoColor = async () => {
                const { availableCapacity, capacity } = await getMemoryInfo();
                const totalMemory = capacity;
                const availableMemory = availableCapacity;
                const usedMemory = totalMemory - availableMemory;
                const memoryUsagePercentage = (usedMemory / totalMemory) * 100;
                setMemoryInUse(bytesToMB(usedMemory));
    
                let color = '#f8f8f8';
    
                if (memoryUsagePercentage < 40) {
                    color = '#74dfa2';
                } else if (memoryUsagePercentage >= 40 && memoryUsagePercentage < 70) {
                    color = '#F7B750'; // Uso de memoria moderado
                } else {
                    color = '#F54180'; // Alto uso de memoria
                }
    
                setLogoColor(color);
            };
    
            handdleLogoColor();
        }, []); */

    return (
        <section className='grid justify-items-center gap-5'>
            <div className='flex flex-col gap-2 items-center'>
                <div className="flex flex-col text-center gap-1">
                    <p className='text-[length:1rem] text-[--neutral-color-alt-primary]'>Reduce memory usage</p>
                    <p className='text-[length:1rem] text-[--neutral-color-alt-primary]'> by suspending tabs</p>

                    <p className="font-bold text-[length:1.8rem]">Auto Suspend</p>
                </div>

                <Switch
                    onChange={() => {
                        handleToggle();
                    }}
                    color='success'
                    classNames={{
                        base: cn(
                            'max-w-md items-center',
                            'justify-between cursor-pointer rounded-lg gap-2 p-4'

                        ),
                        wrapper: 'p-0 h-6 overflow-visible w-16',
                        thumb: cn('min-w-9 max-w-9 min-h-9 max-h-9 border-2 shadow-lg',
                            // pressed
                            'group-data-[selected=true]:ml-7',
                            'group-data-[pressed=true]:w-7'

                        )
                    }}
                >
                </Switch>

            </div>

            <div className='flex items-center gap-4'>
                <Logo className='w-[160px] h-[160px]' fill={logoColor} />
                <div className='flex flex-col'>
                    <div className='flex items-center gap-1 font-bold'>
                        <p className='text-[76px] leading-[76px]'>
                            {mbSaved}
                        </p>
                        <p className='flex self-end text-[34px] leading-[34px]'>Mb</p>
                    </div>

                    <p className='text-[18px] font-normal'>Saved after suspension</p>
                </div>
            </div>
        </section>
    );
};
