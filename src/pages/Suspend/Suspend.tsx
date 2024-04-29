/* eslint-disable @typescript-eslint/no-unused-vars */
import { RadialGauge } from '@/ui/atoms/RadialGauge';
import { autoSuspendTabs } from '@/utils/tabs/autoSuspendTabs';
import { Progress, Switch, cn } from '@nextui-org/react';
import { useState } from 'react';

export const Suspend = () => {
    const [valor, setValor] = useState(50);

    const handleToggle = async () => {
        /* setIsSelected(value); */

        const suspendedTabs = await autoSuspendTabs(3);

        if (suspendedTabs === 0) return;

        console.log(suspendedTabs, ' Tabs was suspended');
        // updateTabs();
    };

    return (
        <section className='grid justify-items-center gap-5'>
            <div className='flex flex-col gap-2 items-center'>
                <div className="flex flex-col text-center">
                    <p className='text-[length:var(--font-size-tiny)] text-[--neutral-color-alt-primary]'>Reduce memory usage by suspending tabs</p>

                    <p className="font-bold text-[length:var(--font-size-secondary-title)]">Auto Suspend</p>
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

            <div className='grid justify-items-center'>
                <div className='flex items-center gap-1 font-bold'>
                    <p className='text-[80px] leading-[80px]'>
                        100
                    </p>
                    <p className='flex self-end text-[34px] leading-[34px]'>Mb</p>
                </div>

                <p className='text-[18px] font-normal'>Saved after suspension</p>

                <div className='w-[300px] pt-[12px]'>
                    <Progress
                        aria-label="Memory saved..."
                        size="lg"
                        value={80}
                        color="success"
                        className="max-w-md"
                    />
                </div>
            </div>
        </section>
    );
};
