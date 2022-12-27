import { TabsStoredType } from '@/contexts/tabs';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { MemoizedTabsListingsLocal } from './TabsListingsLocal';
import { MemoizedTabsListingsSaved } from './TabsListingsSaved';

export const TabsListingsContainer = () => {
    const { typeOfStore, local, saved, loading, isFiltering, filtered } = useGetTabsContext();
    const dispatch = useTabsDispatch();

    return (<>
        {typeOfStore === TabsStoredType.local
            ? <MemoizedTabsListingsLocal
                local={local}
                filtered={filtered}
                isFiltering={isFiltering}
                loading={loading}
                dispatch={dispatch} />
            : <MemoizedTabsListingsSaved
                saved={saved}
                filtered={filtered}
                isFiltering={isFiltering}
                loading={loading}
                dispatch={dispatch} />}
    </>);
};
