import { useGetAllTabs } from '@/customHooks/tabs';
import { TabsTracker } from '@/ui/organisms/TabsTracker';
import { Switch, cn } from '@nextui-org/react';

export const Suspend = () => {
    const tabs = useGetAllTabs();

    console.log(tabs);

    return (
        <section className='grid justify-items-center'>
            <div className='flex flex-col gap-1 items-center'>
                <Switch
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

            <div className='w-full h-[180px]'>

            </div>

            <TabsTracker />
        </section>
    );
};
