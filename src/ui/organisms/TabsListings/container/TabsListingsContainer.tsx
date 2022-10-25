/* eslint-disable @typescript-eslint/no-unused-vars */
import { TabsStoredType } from '@/contexts/tabs';
import { useGetTabsContext, useGetTabsDispatchContext } from '@/contexts/tabs/hooks';
import { useCallback } from 'react';
import { MemoizedTabsListingsLocal } from './TabsListingsLocal';
import { MemoizedTabsListingsSaved, TabsListingsSaved } from './TabsListingsSaved';

export const TabsListingsContainer = () => {
    const { typeOfStore, local, saved, loading } = useGetTabsContext();
    const dispatch = useGetTabsDispatchContext();

    console.log('Container loaded', loading);

    return (<>
        {typeOfStore === TabsStoredType.local
            ? <MemoizedTabsListingsLocal local={local} dispatch={dispatch} loading={loading} />
            : <MemoizedTabsListingsSaved saved={saved} dispatch={dispatch} loading={loading} />}
    </>);
};
