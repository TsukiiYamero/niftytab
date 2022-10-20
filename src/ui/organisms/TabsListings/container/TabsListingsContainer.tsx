import { TabsActions } from '@/contexts/tabs';
import { useGetTabsContext, useGetTabsDispatchContext } from '@/contexts/tabs/hooks';
import { readTabs } from '@/services/tabs';
import { useEffect } from 'react';
import { TabsListings } from '../presentational/TabsListings';

export const TabsListingsContainer = () => {
    const { loading, saved } = useGetTabsContext();
    const dispatch = useGetTabsDispatchContext();

    useEffect(() => {
        const getTabs = async () => {
            dispatch({ type: TabsActions.requestTabs });

            const resp = await readTabs();

            if (resp.error) {
                console.log(resp.error.message);
                return;
            }

            const dataTabs = resp.data ?? [];

            dispatch({ type: TabsActions.updatedSaved, payload: dataTabs });
        };
        getTabs();
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    return <TabsListings tabs={saved as any} />;
};
