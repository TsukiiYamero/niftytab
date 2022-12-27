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
    dispatch: Dispatch<TabsActionType>;
    loading: boolean;
}

export const TabsListingsSaved = ({ saved, dispatch, loading }: props) => {
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

    return (
        <>
            {loading
                ? <SimpleLoading />
                : user
                    ? <TabsListings tabs={saved} makeTabsOptsList={makeTabsOptsList} />
                    : <TabsListingsNotUser />}
        </>
    );
};

export const MemoizedTabsListingsSaved = memo(TabsListingsSaved);
