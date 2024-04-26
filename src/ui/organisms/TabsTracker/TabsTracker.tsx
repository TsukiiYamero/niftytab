/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

import { TabsList } from '@/ui/molecules/TabsList';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch, useDisclosure } from '@nextui-org/react';
import { IconBrandSpeedtest, IconSettings } from '@tabler/icons-react';
/* import { Tabs, Tab } from '@nextui-org/react';
import { IconCpu, IconPanoramaHorizontal } from '@tabler/icons-react'; */
import { SuspendSettings } from '@/ui/molecules/SuspendSettings';
import { autoSuspendTabs } from '@/utils/tabs/autoSuspendTabs';
import { useGetAllTabs } from '@/customHooks/tabs';

export const TabsTracker = ({ tabs }: { tabs: chrome.tabs.Tab[] }) => {
    const [selected, setIsSelected] = useState(false);

    /*     const handleOpen = () => {
            onOpen();
        }; */

    return (
        <article className=" bg-[#121019] p-3 rounded-md border-1 border-[--primary-color-45]">

            <div className='flex justify-between'>
                <div>
                    <h3 className='text-[length:var(--font-size-semi-title)] font-semibold'>Tabs Tracker</h3>
                    <p className='text-[length:var(--font-size-tiny)] text-[--neutral-color-alt-primary]'>Watch tabs that steal your resources.</p>
                </div>

                <div className='flex items-center gap-1'>
                    {/* <div className='flex items-center gap-[10px]'>
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
                            isSelected={selected}
                            onValueChange={handleToggle}
                            startContent={<IconBrandSpeedtest className='h-4 w-4' />}
                        >
                        </Switch>
                    </div> 

                    <Button isIconOnly size='sm' onClick={handleOpen}>
                        <IconSettings className='h-4 w-4 text-[--neutral-color-alt-primary]' />
                    </Button>
                    */}

                </div>
            </div>

            <TabsList tabs={tabs} />
        </article>
    );
};
