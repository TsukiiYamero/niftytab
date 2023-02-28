/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, memo, useEffect } from 'react';
import { AllTabsInfo, AllTabsInfoSupabase, NiftyTab } from '@/models';
import { AuthenticatedContent } from '@/ui/atoms/AuthenticatedContent';
import { CloudListings } from '../../presentational';
import { readAllTabs } from '@/services/tabs';
import { supabaseTabsToNiftyTabs } from '@/utils/tabs';
import { TabsActions, TabsActionType } from '@/contexts/tabs';
import { useAuthState } from '@/contexts/auth';
import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { useTabsCloudOptionList } from '@/customHooks/tabs/useTabsSavedOptionList';
import { moveItem } from '@/utils';

type props = {
    cloud: AllTabsInfo[];
    loading: boolean;
    dispatch: Dispatch<TabsActionType>;
}

export const TabsListingsCloud = ({ cloud, loading, dispatch }: props) => {
    // const { getDefaultUserIds } = useGetDefaultUserIds();
    const { user } = useAuthState();
    const { callApi: fetchAllTabs } = useFetchWithCallback();
    const makeTabsOptsList = useTabsCloudOptionList();

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: TabsActions.requestTabs });
            const { data, error } = await fetchAllTabs(readAllTabs, user?.id);
            dispatch({ type: TabsActions.finishRequestTabs });

            if (error) return;

            const groupTabs: AllTabsInfoSupabase[] = data[0]?.data || [];

            const tabsToCloud: AllTabsInfo[] = groupTabs.map(group => {
                return {
                    ...group,
                    countBadge: group.count_badge,
                    tabs: supabaseTabsToNiftyTabs(group.tabs)
                };
            });

            // moving default to first position
            let tabsOrdered = tabsToCloud;
            const groupDefaultIndex = tabsToCloud.findIndex(group => group.name === 'default');
            if (groupDefaultIndex > -1) tabsOrdered = moveItem(tabsToCloud, groupDefaultIndex, 0);

            dispatch({ type: TabsActions.updateCloud, payload: tabsOrdered });
        };

        user && fetchData();
    }, [dispatch, fetchAllTabs, user]);

    return (
        <AuthenticatedContent>
            <CloudListings cloudGroup={cloud} loading={loading} makeTabsOptsList={makeTabsOptsList} />
        </AuthenticatedContent>
    );
};

export const MemoizedTabsListingsCloud = memo(TabsListingsCloud);
