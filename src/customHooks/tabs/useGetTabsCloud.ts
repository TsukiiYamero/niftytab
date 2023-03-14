/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuthState } from '@/contexts/auth';
import { useFetchWithCallback } from '../useFetchWithCallback';
import { useCallback, useEffect, useState } from 'react';
import { TabsCloud, TabsCloudSupabase } from '@/models';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { TabsActions } from '@/contexts/tabs';
import { readAllTabs } from '@/services/tabs';
import { SESSION_DEFAULT, moveItem, supabaseTabsToNiftyTabs } from '@/utils';

/**
 * Fetches data, transforms it, and return it.
 * @returns An object with two properties: tabsCloud and reFetchTabsCloud.
 */
export const useGetTabsCloud = () => {
    const { user } = useAuthState();
    const { loading } = useGetTabsContext();
    const { callApi: fetchAllTabs } = useFetchWithCallback();
    const [dataToShow, setDataToShow] = useState<TabsCloud[]>([]);
    const dispatch = useTabsDispatch();

    const fetchData = useCallback(async () => {
        if (!user) return;

        dispatch({ type: TabsActions.requestTabs });
        const { data, error } = await fetchAllTabs(readAllTabs, user?.id);

        if (error) return;

        // handle objects name
        const groupTabs: TabsCloudSupabase[] = data[0]?.data || [];
        const tabsToCloudStore: TabsCloud[] = groupTabs.map(group => {
            return {
                ...group,
                countBadge: group.count_badge,
                tabs: supabaseTabsToNiftyTabs(group.tabs)
            };
        });

        // moving default group to first position
        let tabsOrdered = tabsToCloudStore;
        const groupDefaultIndex = tabsToCloudStore.findIndex(group => group.name === SESSION_DEFAULT);
        if (groupDefaultIndex > -1) tabsOrdered = moveItem(tabsToCloudStore, groupDefaultIndex, 0);

        dispatch({ type: TabsActions.updateCloud, payload: tabsOrdered });
        dispatch({ type: TabsActions.finishRequestTabs });
        setDataToShow(tabsOrdered);
    }, [dispatch, fetchAllTabs, user]);

    useEffect(() => {
        fetchData();
    }, [dispatch, fetchAllTabs, fetchData]);

    return { cloud: dataToShow, loading, reFetchTabsCloud: fetchData };
};
