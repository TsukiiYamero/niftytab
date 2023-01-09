import { TabsActions, TabsActionType } from '@/contexts/tabs';
import { useTabsSavedOptionList } from '@/customHooks/tabs/useTabsSavedOptionList';
import { NiftyTab } from '@/models';
import { SimpleLoading } from '@/ui/atoms/Loadings';
import { supabaseTabsToNiftyTabs } from '@/utils/tabs';
import { Dispatch, memo, useEffect } from 'react';
import { TabsListings } from '../presentational';
import { useAuthState } from '@/contexts/auth';
import { TabsListingsNotUser } from './TabsListingsNotUser';
import { useGetDefaultUserIds, useGetTabsByFilter } from '@/customHooks/tabs';

type props = {
    saved: NiftyTab[];
    filtered: NiftyTab[];
    isFiltering: boolean;
    loading: boolean;
    dispatch: Dispatch<TabsActionType>;
}

export const TabsListingsSaved = ({ saved, filtered, isFiltering, loading, dispatch }: props) => {
    const getTabsBySessionDefault = useGetTabsByFilter();
    const { getDefaultUserIds } = useGetDefaultUserIds();
    const { user } = useAuthState();
    const makeTabsOptsList = useTabsSavedOptionList();

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: TabsActions.requestTabs });

            const { defaultsIds, error: errorInIds } = await getDefaultUserIds();
            const { data, error } = await getTabsBySessionDefault('session_id', defaultsIds?.sessionId);

            dispatch({ type: TabsActions.finishRequestTabs });

            if (error ?? errorInIds) return;

            dispatch({ type: TabsActions.updatedSaved, payload: supabaseTabsToNiftyTabs(data) });
        };

        user && fetchData();
    }, [dispatch, getDefaultUserIds, getTabsBySessionDefault, user]);

    const tabsToShow = isFiltering ? filtered : saved;

    return (
        <>
            {loading
                ? <SimpleLoading />
                : user
                    ? <TabsListings loading={loading} tabs={tabsToShow} makeTabsOptsList={makeTabsOptsList} />
                    : <TabsListingsNotUser />}
        </>
    );
};

export const MemoizedTabsListingsSaved = memo(TabsListingsSaved);
