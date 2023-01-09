/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuthState } from '@/contexts/auth';
import { useSaveTabs } from '../tabs/useSaveTabs';
import { useGetDefaultUserIds } from '../tabs/useGetDefaultsTabsId';
import { createSession } from '@/services/tabs';
import { useFetchWithCallback } from '../useFetchWithCallback';
import { SessionNiftyCount, SessionTabsSupabase } from '@/models';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { TabsActions } from '@/contexts/tabs';

export const useSaveSession = () => {
    const { user } = useAuthState();
    const { saveTabs } = useSaveTabs();
    const dispatch = useTabsDispatch();
    const { sessions } = useGetTabsContext();
    const { getDefaultUserIds } = useGetDefaultUserIds();
    const { callApi } = useFetchWithCallback();

    /**
     * Create the Session and then save the tabs with the id of the session
     */
    const saveSession = async (currentChromeTabs: chrome.tabs.Tab[] = [], sessionName: string) => {
        if (!currentChromeTabs || !user) return;

        const { defaultsIds, error: defaultIdsError } = await getDefaultUserIds();
        if (!defaultsIds || defaultIdsError.trim()) return;

        const sessionPayload: SessionTabsSupabase = {
            user_id: user.id,
            browser_name: sessionName
        };

        const { data, error } = await callApi(createSession, sessionPayload);
        if (!data || error) return;

        const sessionId = data[0].id;

        const tabs = await saveTabs(currentChromeTabs, { groupId: defaultsIds.groupId as number, sessionId: sessionId as number });

        const sessionSaved: SessionNiftyCount = {
            browserName: sessionName,
            id: sessionId,
            badgeContent: tabs.length
        };

        dispatch({ type: TabsActions.updatedSessions, payload: [...sessions, sessionSaved] ?? [] });
    };

    return { saveSession };
};
