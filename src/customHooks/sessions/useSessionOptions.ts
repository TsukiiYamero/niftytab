import { OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { useCallback } from 'react';
import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { useTabsDispatch } from '@/contexts/tabs/hooks';
import { TabsActions } from '@/contexts/tabs';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ViewTimelineOutlinedIcon from '@mui/icons-material/ViewTimelineOutlined';
import { useSnackbar } from '@/contexts/snackbar/hooks';
import { SessionNifty, TabsSupabase } from '@/models';
import { deleteSessions } from '@/services/tabs/sessions/deleteSessions';
import { EditOutlined } from '@mui/icons-material';
import { deleteTabsBySessionId } from '@/services/tabs';
import { createChromeTab } from '@/utils/chrome/openTabs';
import { useGetTabsByFilter } from '../tabs';

/**
 * List of several options for Sessions
 */
export const useSessionOptions = () => {
    const { callApi } = useFetchWithCallback();
    const { callApi: fetchDeleteTabs } = useFetchWithCallback();
    const getTabsBySessionId = useGetTabsByFilter();
    const dispatch = useTabsDispatch();
    const showSnackbar = useSnackbar();

    const getTabsFromSupabaseBySessionId = useCallback(async (sessionId: number) => {
        const { data } = await getTabsBySessionId('session_id', sessionId);
        return data || [];
    }, [getTabsBySessionId]);

    const openAllSession = useCallback(
        (session: SessionNifty) => {
            return async () => {
                const tabs: TabsSupabase[] = await getTabsFromSupabaseBySessionId(session.id);

                if (!tabs.length) {
                    showSnackbar('Ops... there is no tabs to open');
                    return;
                }

                tabs.forEach(tab => {
                    createChromeTab(tab.url);
                });
            };
        }, [getTabsFromSupabaseBySessionId, showSnackbar]
    );

    const viewDetails = useCallback((session: SessionNifty) => {
        return async () => {
            showSnackbar('View Details are in construction');
            // console.log(data);
        };
    }, [showSnackbar]);

    const editSession = useCallback((session: SessionNifty) => {
        return () => {
            showSnackbar('Edit are in construction');
        };
    }, [showSnackbar]);

    const deleteSession = useCallback(
        (session: SessionNifty) => {
            return async () => {
                dispatch({ type: TabsActions.requestTabs });

                // first need to delete the tabs because violates foreign key constraint
                const { error: errorTabs } = await fetchDeleteTabs(deleteTabsBySessionId, session.id);
                let errorSession = false;

                if (!errorTabs) {
                    const { error } = await callApi(deleteSessions, session.id);
                    errorSession = !!error;
                }

                dispatch({ type: TabsActions.finishRequestTabs });

                if (errorTabs ?? errorSession) return;

                showSnackbar('Session Deleted', 'success');
                dispatch({ type: TabsActions.deleteSession, payload: session.id });
            };
        }, [callApi, dispatch, fetchDeleteTabs, showSnackbar]
    );

    const optsList = useCallback((session: SessionNifty): OptionBtnMenuList[] => {
        return [{
            onClick: openAllSession(session), text: 'Open Session', Icon: OpenInNewIcon
        }, {
            onClick: viewDetails(session), text: 'View Details', Icon: ViewTimelineOutlinedIcon
        }, {
            onClick: editSession(session), text: 'Edit Session', Icon: EditOutlined
        }, {
            onClick: deleteSession(session), text: 'Delete Session', Icon: DeleteRoundedIcon
        }];
    }, [deleteSession, openAllSession, editSession, viewDetails]);

    return optsList;
};

/* fmt.Sprintf("%[1]d texto algo %[5]d", 4, 5, 6) */
