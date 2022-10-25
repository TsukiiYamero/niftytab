/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from '@/api/config';
import { TabsActions, TabsActionType } from '@/contexts/tabs';
import { useFetch } from '@/customHooks/useFetch';
import { NiftyTab } from '@/models';
import { readTabs, SUPABASE_TABLE_TABS } from '@/services/tabs';
import { abortController } from '@/utils/abortController';
import { supabaseTabsToNiftyTabs } from '@/utils/tabs';
import { Dispatch, memo, useEffect } from 'react';
import { TabsListings } from '../presentational';

type props = {
    saved: NiftyTab[];
    dispatch: Dispatch<TabsActionType>;
    loading: boolean;
}

export const TabsListingsSaved = ({ saved, dispatch, loading }: props) => {
    // const { callApi } = useFetch({ apiFunc: readTabs });
    console.log('TabsListingsSaved loaded', saved);

    useEffect(() => {
        console.log('useEffect Fetch');
        const controller = abortController();
        const getTabs = async () => {
            dispatch({ type: TabsActions.requestTabs });
            const { data, error } = await supabase
                .from(SUPABASE_TABLE_TABS)
                .select('*')
                .abortSignal(controller.signal);

            const tabs = supabaseTabsToNiftyTabs(data ?? []);
            dispatch({ type: TabsActions.updatedSaved, payload: tabs });
        };
        getTabs();

        return () => {
            controller?.abort();
        };
    }, [dispatch]);

    return (
        <TabsListings tabs={saved} />
    );
};

export const MemoizedTabsListingsSaved = memo(TabsListingsSaved);
