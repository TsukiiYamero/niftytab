/* eslint-disable @typescript-eslint/no-unused-vars */
import { useGetAllTabs } from '@/customHooks/tabs';
import { RadialGauge } from '@/ui/atoms/RadialGauge';
import { ModalSettings } from '@/ui/organisms/ModalSettings';
import { TabsTracker } from '@/ui/organisms/TabsTracker';
import { autoSuspendTabs } from '@/utils/tabs/autoSuspendTabs';
import { Switch, cn, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';

export const Suspend = () => {
    const [valor, setValor] = useState(50);

    const { tabs, updateTabs } = useGetAllTabs();

    const handleToggle = async () => {
        /* setIsSelected(value); */

        const suspendedTabs = await autoSuspendTabs(3);

        if (suspendedTabs === 0) return;

        console.log(suspendedTabs, ' Tabs was suspended');
        updateTabs();
    };

    return (
        <section className='grid justify-items-center gap-5'>
            <div className='flex flex-col gap-1 items-center'>
                <Switch
                    onChange={() => {
                        handleToggle();
                    }}
                    classNames={{
                        base: cn(
                            'max-w-md items-center',
                            'justify-between cursor-pointer rounded-lg gap-2 p-4'

                        ),
                        wrapper: 'p-0 h-5 overflow-visible w-14',
                        thumb: cn('min-w-8 max-w-8 min-h-8 max-h-8 border-2 shadow-lg',
                            // pressed
                            'group-data-[selected=true]:ml-6',
                            'group-data-[pressed=true]:w-7'

                        )
                    }}
                >
                </Switch>

                <div className="flex flex-col text-center">
                    <p className="font-bold text-[length:var(--font-size-semi-title)]">Auto Suspend</p>

                    <p className='text-[length:var(--font-size-tiny)] text-[--neutral-color-alt-primary]'>Reduce memory usage by suspending tabs</p>
                </div>
            </div>

            <div className='grid justify-items-center'>
                <div className='w-[300px] h-[130px] overflow-hidden'>
                    <RadialGauge value={valor} trackSizeDeg={150} />
                </div>
            </div>

            <TabsTracker tabs={tabs} />
        </section>
    );
};
