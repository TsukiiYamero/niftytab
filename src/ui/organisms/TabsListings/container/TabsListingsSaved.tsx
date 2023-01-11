import { TabsActions, TabsActionType } from '@/contexts/tabs';
import { useTabsCloudOptionList } from '@/customHooks/tabs/useTabsSavedOptionList';
import { NiftyTab } from '@/models';
import { SimpleLoading } from '@/ui/atoms/Loadings';
import { supabaseTabsToNiftyTabs } from '@/utils/tabs';
import { Dispatch, memo, useEffect } from 'react';
import { TabsListings } from '../presentational';
import { useAuthState } from '@/contexts/auth';
import { UserNoAuthenticatedMessage } from './UserNoAuthenticatedMessage';
import { useGetDefaultUserIds, useGetTabsByFilter } from '@/customHooks/tabs';

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
        <>
            {loading
                ? <SimpleLoading />
                : user
                    ? <TabsListings loading={loading} tabs={tabsToShow} makeTabsOptsList={makeTabsOptsList} />
                    : <UserNoAuthenticatedMessage />}
        </>
    );
};

export const MemoizedTabsListingsCloud = memo(TabsListingsCloud);
