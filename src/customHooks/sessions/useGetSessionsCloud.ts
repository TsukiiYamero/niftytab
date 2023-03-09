/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuthState } from '@/contexts/auth';
import { TabsActions } from '@/contexts/tabs';
import { useTabsDispatch } from '@/contexts/tabs/hooks';
import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { SessionCloud, TabsCloudSupabase } from '@/models';
import { readAllSessions } from '@/services/tabs';
import { SESSION_DEFAULT } from '@/utils';
import { useCallback, useEffect, useState } from 'react';

export const useGetSessionsCloud = () => {
    const { callApi } = useFetchWithCallback();
    const { user } = useAuthState();
    const dispatch = useTabsDispatch();
    const [sessionsCloud, setSessionsCloud] = useState<SessionCloud[]>([]);

    const getSessions = useCallback(async () => {
        if (!user) return;

        dispatch({ type: TabsActions.requestTabs });
        const { data, error } = await callApi(readAllSessions, user.id);
        dispatch({ type: TabsActions.finishRequestTabs });

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
        SessionCloud.splice(defaultSessionIndex, 1);
        console.log('sessions executed local', SessionCloud);

        setSessionsCloud(SessionCloud);
        // dispatch({ type: TabsActions.updateSessions, payload: SessionCloud });
    }, [callApi, dispatch, user]);

    useEffect(() => {
        getSessions();
    }, [callApi, dispatch, getSessions]);

    return { sessionsCloud, requestSessions: getSessions };
};
