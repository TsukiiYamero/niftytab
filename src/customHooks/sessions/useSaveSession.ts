/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuthState } from '@/contexts/auth';
import { useSaveTabs } from '../tabs/useSaveTabs';
import { useGetDefaultUserIds } from '../tabs/useGetDefaultsTabsId';
import { createSession } from '@/services/tabs';
import { useFetchWithCallback } from '../useFetchWithCallback';
import { SessionTabsSupabase } from '@/models';

export const useSaveSession = () => {
    const { user } = useAuthState();
    const { saveTabs } = useSaveTabs();
    const { getDefaultUserIds } = useGetDefaultUserIds();
    const { callApi } = useFetchWithCallback();

    /**
     * Create Session and then use save Tabs to save all tabs but with the id of the session
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

        saveTabs(currentChromeTabs, { groupId: defaultsIds.groupId as number, sessionId: sessionId as number });
    };

    return { saveSession };
};
