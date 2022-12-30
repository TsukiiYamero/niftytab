import { OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { useCallback } from 'react';
import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { useTabsDispatch } from '@/contexts/tabs/hooks';
import { TabsActions } from '@/contexts/tabs';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ViewTimelineOutlinedIcon from '@mui/icons-material/ViewTimelineOutlined';
import { useSnackbar } from '@/contexts/snackbar/hooks';
import { SessionNifty } from '@/models';
import { deleteSessions } from '@/services/tabs/sessions/deleteSessions';
import { readTabsWithFilter } from '@/services/tabs/tab/readTabs';
import { EditOutlined } from '@mui/icons-material';
import { ReadGroupsWithFiltering2, deleteTabsBySessionId } from '@/services/tabs';

/**
 * List of several options for Sessions
 */
export const useSessionOptions = () => {
    const { callApi } = useFetchWithCallback();
    const { callApi: fetchDeleteTabs } = useFetchWithCallback();
    const { callApi: fetchGetTabs } = useFetchWithCallback();
    const dispatch = useTabsDispatch();
    const showSnackbar = useSnackbar();

    const openAllSession = useCallback(
        (session: SessionNifty) => {
            return () => {
                // console.log(session);
            };
        }, []
    );

    const viewDetails = useCallback((session: SessionNifty) => {
        return async () => {
            showSnackbar('View Details are in construction');

            const filter: ReadGroupsWithFiltering2 = {
                eq: {
                    column: 'session_id',
                    equalTo: session.id
                }
            };

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { data } = await fetchGetTabs(readTabsWithFilter, filter);
            // console.log(data);
        };
    }, [showSnackbar, fetchGetTabs]);

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

                if (!errorTabs && !errorSession)
                    showSnackbar('Session Deleted', 'success');
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
