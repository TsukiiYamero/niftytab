import { TabsActions, TabsActionType } from '@/contexts/tabs';
import { useTabsSavedOptionList } from '@/customHooks/tabs/useTabsSavedOptionList';
import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { NiftyTab } from '@/models';
import { readTabs } from '@/services/tabs';
import { SimpleLoading } from '@/ui/atoms/Loadings';
import { supabaseTabsToNiftyTabs } from '@/utils/tabs';
import { Dispatch, memo, useEffect } from 'react';
import { TabsListings } from '../presentational';

type props = {
    saved: NiftyTab[];
    dispatch: Dispatch<TabsActionType>;
    loading: boolean;
}

export const TabsListingsSaved = ({ saved, dispatch, loading }: props) => {
    const { callApi } = useFetchWithCallback();
    const makeTabsOptsList = useTabsSavedOptionList();

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: TabsActions.requestTabs });
            const { data, error } = await callApi(readTabs);
            if (error) {
                console.log(error.message);
                dispatch({ type: TabsActions.finishRequestTabs });
                return;
            }
            console.log('Saved', supabaseTabsToNiftyTabs(data));
            dispatch({ type: TabsActions.updatedSaved, payload: supabaseTabsToNiftyTabs(data) });
        };

        fetchData();
    }, [dispatch, callApi]);

    return (
        <>
            {loading ? <SimpleLoading /> : <TabsListings tabs={saved} makeTabsOptsList={makeTabsOptsList} />}
        </>
    );
};

export const MemoizedTabsListingsSaved = memo(TabsListingsSaved);
