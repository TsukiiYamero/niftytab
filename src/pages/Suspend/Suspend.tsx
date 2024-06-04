/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SettingsContext } from '@/contexts/Settings';
import { Logo } from '@/ui/atoms/svgs';
import { bytesToMB, getMemoryInfo } from '@/utils';
import { autoSuspendTabs } from '@/utils/tabs/autoSuspendTabs';
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Switch, cn, useDisclosure } from '@nextui-org/react';
import { IconSettings } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import { ShowTabs } from '../ShowTabs';
import { useGetDataFromLocal } from '@/customHooks/useGetDataFromLocal';
import { useSetDataForLocal } from '@/customHooks/useSetDataForLocal';

export const Suspend = () => {
    const { data } = useGetDataFromLocal();
    const { setDataForLocal } = useSetDataForLocal();
    const [isSelected, setIsSelected] = useState<boolean>(false);
    const { openSettings } = useContext(SettingsContext);
    const [mbSaved, setMbSaved] = useState(0);
    const [nOfSuspendedTabs, setNOfSuspendedTabs] = useState(0);
    const [logoColor, setLogoColor] = useState<string>('#f8f8f8');
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        setIsSelected(data.isSuspend ?? isSelected);
    }, [data.isSuspend]);

    const onCloseModal = () => {
        onClose();
    };

    const onOpenModal = () => {
        onOpen();
    };

    const handleOpenModal = () => { openSettings(); };

    const handleToggle = (value: boolean) => {
        setIsSelected(value);
        setDataForLocal({ isSuspend: value });

        if (!value)
            return;

        handdleSuspend();
    };

    const handdleSuspend = async () => {
        const { availableCapacity: memoryBefore } = await getMemoryInfo();
        const suspendedTabs = await autoSuspendTabs(3);
        // get info and rest
        if (suspendedTabs === 0) return;

        const { availableCapacity: memoryInfoAft } = await getMemoryInfo();
        const difference = memoryInfoAft - memoryBefore;
        const memoryFree = bytesToMB(Math.abs(difference));
        setNOfSuspendedTabs(suspendedTabs);
        setLogoColor('#74dfa2');
        setMbSaved(memoryFree);
    };

    return (
        <section className='grid justify-items-center gap-3'>
            <div className='flex flex-col gap-3 items-center'>
                <div className="flex flex-col text-center gap-1">
                    <div>
                        <p className='text-[length:1rem] text-[--neutral-color-alt-primary]'>Reduce memory usage</p>
                        <p className='text-[length:1rem] text-[--neutral-color-alt-primary]'> by suspending tabs</p>
                    </div>

                    <p className={`text-[${logoColor}] font-bold text-[length:1.8rem]`}>Auto Suspend</p>
                </div>

                <div className='flex items-center relative pt-[10px]'>
                    <Switch
                        isSelected={isSelected}
                        onValueChange={(value) => {
                            handleToggle(value);
                        }}
                        color='success'
                        classNames={{
                            base: cn(
                                'max-w-md items-center',
                                'justify-between cursor-pointer rounded-lg gap-2 py-1'

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

                    <Button isIconOnly className='absolute left-[74px]' size='sm' variant='light' onClick={handleOpenModal}>
                        <IconSettings className='w-[--icons-size-primary] h-[--icons-size-primary] text-[--neutral-color-alt-primary]' />
                    </Button>
                </div>

            </div>

            <div className='mt-[14px]'>
                <Button variant='bordered' size='sm' className='' onClick={onOpenModal}>
                    Show Tabs
                </Button>
            </div>

            <div className='flex items-center gap-5'>
                <Logo className='w-[110px] h-[110px]' fill={logoColor} />
                <div className='flex flex-col'>
                    <div className='flex items-center gap-1 font-bold'>
                        <p className='text-[64px] leading-[64px]'>
                            {mbSaved}
                        </p>
                        <p className='flex self-end text-[32px] leading-[32px]'>Mb</p>
                    </div>

                    <p className='text-[18px] font-normal'>Saved after suspension</p>

                    <div className='flex items-center gap-1'>
                        <p className='text-[13px] font-normal'>
                            {nOfSuspendedTabs}
                        </p>
                        <p className='text-[13px] font-normal'>
                            tabs was suspended
                        </p>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isOpen}
                isDismissable={false}
                onOpenChange={onCloseModal}
                backdrop='blur'
                size='full'
            >
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalBody>
                        <div>
                            <ShowTabs />
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </section>
    );
};
