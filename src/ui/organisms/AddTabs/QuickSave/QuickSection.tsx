import { useAuthState } from '@/contexts/auth';
import { useAuthModal } from '@/contexts/authModal';
import { TabsActions } from '@/contexts/tabs';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { useSaveTabs } from '@/customHooks/tabs/useSaveTabs';
import { getActiveTab, getAllChromeTabs } from '@/utils/chrome';
import { Box, Button } from '@mui/material';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { Modal, useModal } from '@/ui/molecules/Modal';
import { QuickSession } from './QuickSession';
import { useCallback } from 'react';
import { useGetDefaultUserIds } from '@/customHooks/tabs/useGetDefaultsTabsId';
import { useSaveSession } from '@/customHooks/sessions/useSaveSession';
import { SESSION_DEFAULT, SUCCESS_MESSAGE } from '@/utils';
import { useSnackbar } from '@/contexts/snackbar/hooks';
import { SessionCloud } from '@/models';

type Props = {
    closeModal: () => void
}

export const QuickSection = ({ closeModal: closeSaveModal }: Props) => {
    const { user } = useAuthState();
    const { cloud: saved, sessions } = useGetTabsContext();
    const dispatch = useTabsDispatch();
    const showSnackbar = useSnackbar();
    const { getDefaultUserIds } = useGetDefaultUserIds();
    const { openAuthModal, setIsSignIn } = useAuthModal();
    const { isOpen, openModal, closeModal } = useModal();

    const saveTabs = useSaveTabs();
    const saveSession = useSaveSession();

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

        const { defaultsIds, error: defaultIdsError } = await getDefaultUserIds();
        if (!defaultsIds || defaultIdsError.trim()) return;

        const tabsCreated = await saveTabs(TabsToSave, defaultsIds);

        // make arr TabsCloud to TabsReducer
        const tabsDefault = saved.map(tab => {
            if (tab.name === SESSION_DEFAULT) {
                return {
                    ...tab,
                    countBadge: tab.countBadge + tabsCreated.length,
                    tabs: [...tab.tabs, ...tabsCreated]
                };
            }

            return tab;
        });

        if (tabsCreated.length > 0) {
            showSnackbar(SUCCESS_MESSAGE, 'success');
            dispatch({ type: TabsActions.updateCloud, payload: tabsDefault ?? [] });
        }

        dispatch({ type: TabsActions.finishRequestTabs });

        closeSaveModal();
    };

    const onClickSession = async () => {
        if (!user) {
            setIsSignIn(true);
            openAuthModal();
            return;
        }

        openModal();
    };

    const onSaveSession = useCallback(async (name: string) => {
        closeModal();

        const chromeTabs = await getAllChromeTabs();
        const sessionCreated = await saveSession(chromeTabs, name);

        if (!sessionCreated) return;

        // parsing for store
        const sessionCreatedCloud: SessionCloud = {
            countBadge: sessionCreated.badgeContent,
            name: sessionCreated.browserName,
            id: sessionCreated.id
        };

        dispatch({ type: TabsActions.updateSessions, payload: [...sessions, sessionCreatedCloud] ?? [] });
        showSnackbar('Session saved', 'success');
        closeSaveModal();
    }, [closeModal, saveSession, dispatch, sessions, showSnackbar, closeSaveModal]);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '10px'
                }}>
                <Button fullWidth startIcon={<ArticleOutlinedIcon />} onClick={() => { handleSaveTabs(false); }} variant="contained">Save active tab</Button>
                <Button fullWidth startIcon={<FilterNoneOutlinedIcon />} onClick={() => { handleSaveTabs(); }} variant="contained">Save all tabs</Button>
                <Button fullWidth startIcon={<InboxOutlinedIcon />} onClick={() => { onClickSession(); }} variant="contained">Save tabs in session</Button>
            </Box>

            <Modal isOpen={isOpen} onClose={closeModal} closeByClickOutside={false}>
                <QuickSession closeQuickSession={closeModal} setSessionName={onSaveSession}></QuickSession>
            </Modal>
        </ >
    );
};
