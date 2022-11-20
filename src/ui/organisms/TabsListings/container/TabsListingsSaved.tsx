import { TabsActions, TabsActionType } from '@/contexts/tabs';
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

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: TabsActions.requestTabs });
            const { data, error } = await callApi(readTabs);
            if (error) {
                console.log(error.message);
            }
            console.log('Saved', supabaseTabsToNiftyTabs(data));
            dispatch({ type: TabsActions.updatedSaved, payload: supabaseTabsToNiftyTabs(data) });
        };

        fetchData();
    }, [dispatch, callApi]);

    return (
        <>
            {loading ? <SimpleLoading /> : <TabsListings tabs={saved} />}
        </>
    );
};

export const MemoizedTabsListingsSaved = memo(TabsListingsSaved);
