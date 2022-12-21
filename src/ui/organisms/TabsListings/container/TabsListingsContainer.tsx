import { TabsStoredType } from '@/contexts/tabs';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { MemoizedTabsListingsLocal } from './TabsListingsLocal';
import { MemoizedTabsListingsSaved } from './TabsListingsSaved';

export const TabsListingsContainer = () => {
    const { typeOfStore, local, saved, loading } = useGetTabsContext();
    const dispatch = useTabsDispatch();

    return (<>
        {typeOfStore === TabsStoredType.local
            ? <MemoizedTabsListingsLocal local={local} dispatch={dispatch} loading={loading} />
            : <MemoizedTabsListingsSaved saved={saved} dispatch={dispatch} loading={loading} />}
    </>);
};
