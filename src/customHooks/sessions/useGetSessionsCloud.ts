import { useAuthState } from '@/contexts/auth';
import { TabsActions } from '@/contexts/tabs';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { SessionCloud, TabsCloudSupabase } from '@/models';
import { readAllSessions } from '@/services/tabs';
import { SESSION_DEFAULT } from '@/utils';
import { useCallback, useEffect, useState } from 'react';

export const useGetSessionsCloud = () => {
    const { user } = useAuthState();
    const { loading } = useGetTabsContext();
    const [dataToShow, setDataToShow] = useState<SessionCloud[]>([]);
    const { callApi } = useFetchWithCallback();
    const dispatch = useTabsDispatch();

    const getSessions = useCallback(async () => {
        if (!user) return;

        dispatch({ type: TabsActions.requestTabs });

        const { data, error } = await callApi(readAllSessions, user.id);
        if (error) return;

        const groupTabs: TabsCloudSupabase[] = data[0]?.data || [];
        const SessionCloud: SessionCloud[] = groupTabs.map(group => {
            return {
                ...group,
                countBadge: group.count_badge
            };
        });

        // remove default group
        const defaultSessionIndex = SessionCloud.findIndex(session => session.name === SESSION_DEFAULT);
        SessionCloud.splice(defaultSessionIndex, 1); // cambiar por metodo inmutable

        dispatch({ type: TabsActions.updateSessions, payload: SessionCloud });
        dispatch({ type: TabsActions.finishRequestTabs });
        setDataToShow(SessionCloud);
    }, [callApi, dispatch, user]);

    useEffect(() => {
        getSessions();
    }, [callApi, dispatch, getSessions]);

    return { sessions: dataToShow, loading, requestSessions: getSessions };
};
