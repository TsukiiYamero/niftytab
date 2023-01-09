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
import { SUCCESS_MESSAGE } from '@/utils';
import { useSnackbar } from '@/contexts/snackbar/hooks';

type Props = {
    closeModal: () => void
}

export const QuickSection = ({ closeModal: closeSaveModal }: Props) => {
    const { user } = useAuthState();
    const { saved, sessions } = useGetTabsContext();
    const dispatch = useTabsDispatch();
    const showSnackbar = useSnackbar();
    const { getDefaultUserIds } = useGetDefaultUserIds();
    const { openAuthModal, setIsSignIn } = useAuthModal();
    const { isOpen, openModal, closeModal } = useModal();

    const { saveTabs } = useSaveTabs();
    const { saveSession } = useSaveSession();

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

        if (tabsCreated.length > 0) {
            showSnackbar(SUCCESS_MESSAGE, 'success');
            dispatch({ type: TabsActions.updatedSaved, payload: [...saved, ...tabsCreated] ?? [] });
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

        dispatch({ type: TabsActions.updatedSessions, payload: [...sessions, sessionCreated] ?? [] });
        showSnackbar('Session saved', 'success');
    }, [closeModal, saveSession, dispatch, sessions, showSnackbar]);

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
