import { TabsActions, TabsActionType } from '@/contexts/tabs';
import { useTabsCloudOptionList } from '@/customHooks/tabs/useTabsSavedOptionList';
import { NiftyTab } from '@/models';
import { supabaseTabsToNiftyTabs } from '@/utils/tabs';
import { Dispatch, memo, useEffect } from 'react';
import { TabsListings } from '../presentational';
import { useAuthState } from '@/contexts/auth';
import { useGetDefaultUserIds, useGetTabsByFilter } from '@/customHooks/tabs';
import { AuthenticatedContent } from '@/ui/atoms/AuthenticatedContent';

type props = {
    cloud: NiftyTab[];
    filtered: NiftyTab[];
    isFiltering: boolean;
    loading: boolean;
    dispatch: Dispatch<TabsActionType>;
}

export const TabsListingsCloud = ({ cloud, filtered, isFiltering, loading, dispatch }: props) => {
    const getTabsBySessionDefault = useGetTabsByFilter();
    const { getDefaultUserIds } = useGetDefaultUserIds();
    const { user } = useAuthState();
    const makeTabsOptsList = useTabsCloudOptionList();

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: TabsActions.requestTabs });

            const { defaultsIds, error: errorInIds } = await getDefaultUserIds();
            const { data, error } = await getTabsBySessionDefault('session_id', defaultsIds?.sessionId);

            dispatch({ type: TabsActions.finishRequestTabs });

            if (error ?? errorInIds) return;

            dispatch({ type: TabsActions.updateCloud, payload: supabaseTabsToNiftyTabs(data) });
        };

        user && fetchData();
    }, [dispatch, getDefaultUserIds, getTabsBySessionDefault, user]);

    const tabsToShow = isFiltering ? filtered : cloud;

    return (
        <AuthenticatedContent>
            <TabsListings loading={loading} tabs={tabsToShow} makeTabsOptsList={makeTabsOptsList} />
        </AuthenticatedContent>
    );
};

export const MemoizedTabsListingsCloud = memo(TabsListingsCloud);
