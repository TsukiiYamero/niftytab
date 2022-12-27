import { TabsActions, TabsActionType } from '@/contexts/tabs';
import { useTabsSavedOptionList } from '@/customHooks/tabs/useTabsSavedOptionList';
import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { NiftyTab } from '@/models';
import { readTabs } from '@/services/tabs';
import { SimpleLoading } from '@/ui/atoms/Loadings';
import { supabaseTabsToNiftyTabs } from '@/utils/tabs';
import { Dispatch, memo, useEffect } from 'react';
import { TabsListings } from '../presentational';
import { useAuthState } from '@/contexts/auth';
import { TabsListingsNotUser } from './TabsListingsNotUser';

type props = {
    saved: NiftyTab[];
    filtered: NiftyTab[];
    isFiltering: boolean;
    loading: boolean;
    dispatch: Dispatch<TabsActionType>;
}

export const TabsListingsSaved = ({ saved, filtered, isFiltering, loading, dispatch }: props) => {
    const { callApi } = useFetchWithCallback();
    const { user } = useAuthState();
    const makeTabsOptsList = useTabsSavedOptionList();

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: TabsActions.requestTabs });
            const { data, error } = await callApi(readTabs);
            dispatch({ type: TabsActions.finishRequestTabs });

            if (error) return;

            dispatch({ type: TabsActions.updatedSaved, payload: supabaseTabsToNiftyTabs(data) });
        };

        user && fetchData();
    }, [dispatch, callApi, user]);

    const tabsToShow = isFiltering ? filtered : saved;

    return (
        <>
            {loading
                ? <SimpleLoading />
                : user
                    ? <TabsListings tabs={tabsToShow} makeTabsOptsList={makeTabsOptsList} />
                    : <TabsListingsNotUser />}
        </>
    );
};

export const MemoizedTabsListingsSaved = memo(TabsListingsSaved);
