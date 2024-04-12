import { TabsList } from '@/ui/molecules/TabsList';
import { Button, Switch } from '@nextui-org/react';
import { IconBrandSpeedtest, IconSettings } from '@tabler/icons-react';
/* import { Tabs, Tab } from '@nextui-org/react';
import { IconCpu, IconPanoramaHorizontal } from '@tabler/icons-react'; */

export const TabsTracker = () => {
    return (
        <article className=" bg-[#121019] p-3 rounded-md border-1 border-[--primary-color-45]">

            <div className='flex justify-between'>
                <div>
                    <h3 className='text-[length:var(--font-size-semi-title)] font-semibold'>Tabs Tracker</h3>
                    <p className='text-[length:var(--font-size-tiny)] text-[--neutral-color-alt-primary]'>Watch tabs that steal your resources.</p>
                </div>

                <div className='flex items-center gap-1'>
                    <div className='flex items-center gap-[10px]'>
                        <div className='text-right space-x-2'>
                            <p className='text-[length:var(--font-size-common)] text-[--neutral-color-alt-primary]'>
                                Auto
                            </p>
                            <p className='text-[length:var(--font-size-common)] text-[--neutral-color-alt-primary]'>
                                Suspend
                            </p>
                        </div>
                        <Switch
                            defaultSelected
                            size="md"
                            color="secondary"
                            startContent={<IconBrandSpeedtest className='h-4 w-4' />}
                        >
                        </Switch>
                    </div>

                    <Button isIconOnly size='sm'>
                        <IconSettings className='h-4 w-4 text-[--neutral-color-alt-primary]' />
                    </Button>

                </div>
            </div>

            {/*             <Tabs className='mt-4'
                classNames={{
                    cursor: 'bg-[--primary-color-45]',
                    tabContent: 'group-data-[selected=true]:text-[--primary-color]'
                }} aria-label="Tabs Info Options" color='primary' radius="full">
                <Tab
                    key="gpu"
                    title={
                        <div className="flex items-center space-x-2">
                            <IconCpu className="h-5 w-5 text-[--neutral-color-primary]" />
                            <span className='text-[length:var(--font-size-tiny)] font-medium'>GPU</span>
                        </div>
                    }
                />
                <Tab
                    key="ram"
                    title={
                        <div className="flex items-center space-x-2">
                            <IconPanoramaHorizontal className="h-5 w-5 text-[--neutral-color-primary]" />
                            <span className='text-[length:var(--font-size-tiny)] font-medium'>Ram</span>
                        </div>
                    }
                />
            </Tabs> */}

            <TabsList />

        </article>
    );
};
