import { TabsActions } from '@/contexts/tabs';
import { useTabsDispatch } from '@/contexts/tabs/hooks';
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
import { useAuthModal } from '@/contexts/authModal';
import { useAuthState } from '@/contexts/auth';

export const AddTabs = () => {
    const { isOpen, closeModal, openModal } = useModal();
    const { user } = useAuthState();
    const dispatch = useTabsDispatch();
    const { openAuthModal, setIsSignIn } = useAuthModal();

    const { saveTabs } = useSaveTabs();

    const iconLeft = {
        icon: <AddTabIcon />,
        iconSize: IconsSize.medium
    };

    const iconRight = {
        icon: <ArrowForward />,
        iconSize: IconsSize.medium
    };

    const handleSaveTabs = async (saveAll = true) => {
        if (!user) {
            setIsSignIn(true);
            openAuthModal();
            return;
        }

        dispatch({ type: TabsActions.requestTabs });

        let TabsToSave: chrome.tabs.Tab[] = [];

        saveAll
            ? TabsToSave = await getAllChromeTabs()
            : TabsToSave = [await getActiveTab()];

        await saveTabs(TabsToSave);

        dispatch({ type: TabsActions.finishRequestTabs });
        closeModal();
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
                        onClick={() => { handleSaveTabs(false); }}
                        text="Save current Tab"
                        iconLeft={iconLeft}
                        iconRight={iconRight}
                    />
                    <TabCreationButton
                        onClick={() => { handleSaveTabs(); }}
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
