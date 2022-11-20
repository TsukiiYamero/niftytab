import { TabsActions } from '@/contexts/tabs';
import { useGetTabsDispatchContext } from '@/contexts/tabs/hooks';
import { useSaveTabs } from '@/customHooks/tabs/useSaveTabs';
import { StandardButton } from '@/ui/atoms/Buttons';
import { TabCreationButton } from '@/ui/atoms/Buttons/TabCreationButton';
import { AddIcon, ArrowForward } from '@/ui/atoms/icons';
import { AddTabIcon } from '@/ui/atoms/icons/AddTabIcon';
import { Modal, useModal } from '@/ui/molecules/Modal';
import { getActiveTab, getAllChromeTabs } from '@/utils/chrome';
import { IconsSize } from '@/utils/icons/iconsPropertys';
import { MouseEvent, useEffect } from 'react';
import './addTabs.css';

export const AddTabs = () => {
    const { isOpen, closeModal, openModal } = useModal();
    const dispatch = useGetTabsDispatchContext();

    const { saveTabs } = useSaveTabs();

    const iconLeft = {
        icon: <AddTabIcon />,
        iconSize: IconsSize.medium
    };

    const iconRight = {
        icon: <ArrowForward />,
        iconSize: IconsSize.medium
    };

    const handleSaveSingleTab = async (ev: MouseEvent<HTMLDivElement>) => {
        dispatch({ type: TabsActions.requestTabs });
        const activeTab = await getActiveTab();
        await saveTabs([activeTab]);
    };

    const handleSaveAllTabs = async (ev: MouseEvent<HTMLDivElement>) => {
        dispatch({ type: TabsActions.requestTabs });
        const currentChromeTabs = await getAllChromeTabs();
        await saveTabs(currentChromeTabs);
    };

    const handleSessionCreation = (ev: MouseEvent<HTMLDivElement>) => {
        console.log('click', ev);
    };

    const handleGroupCreation = (ev: MouseEvent<HTMLDivElement>) => {
        console.log('click', ev);
    };

    useEffect(() => {
        return () => console.log('c murio');
    }, []);

    return (
        <div>
            <StandardButton
                icon={<AddIcon />}
                text={'Save Tabs'}
                onClick={() => openModal()}
            />

            <Modal
                isOpen={isOpen}
                onClose={closeModal}
                modalClassSize={'modal-save-tabs-size'}
            >
                <div
                    style={{
                        padding: '16px 10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}
                >
                    <h2>Add Tabs</h2>
                    <span>Quick</span>

                    <TabCreationButton
                        onClick={handleSaveSingleTab}
                        text="Save current Tab"
                        iconLeft={iconLeft}
                        iconRight={iconRight}
                    />
                    <TabCreationButton
                        onClick={handleSaveAllTabs}
                        text="Save All Tabs"
                        iconLeft={iconLeft}
                        iconRight={iconRight}
                    />

                    <hr />
                    <span>Custom</span>

                    <TabCreationButton
                        onClick={handleGroupCreation}
                        text="Save In Session"
                        iconLeft={iconLeft}
                        iconRight={iconRight}
                    />
                    <TabCreationButton
                        onClick={handleSessionCreation}
                        text="Save In Group"
                        iconLeft={iconLeft}
                        iconRight={iconRight}
                    />
                </div>
            </Modal>
        </div>
    );
};
