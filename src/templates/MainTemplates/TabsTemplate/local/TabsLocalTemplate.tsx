import { TabsActions, TypeOfStore } from '@/contexts/tabs';
import { useTabsDispatch } from '@/contexts/tabs/hooks';
import { MemoizedTabsListingsLocal } from '@/ui/organisms/TabsListings';
import { useEffect } from 'react';

export const TabsLocalTemplate = () => {
    const dispatch = useTabsDispatch();

    useEffect(() => {
        dispatch({ type: TabsActions.changeTypeOfStore, payload: TypeOfStore.local });
    }, [dispatch]);

    return <MemoizedTabsListingsLocal />;
};
