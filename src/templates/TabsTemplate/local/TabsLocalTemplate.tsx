import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { NiftyTab } from '@/models';
import { MemoizedTabsListingsLocal } from '@/ui/organisms/TabsListings';

export const TabsLocalTemplate = () => {
    const { local, loading, isFiltering, filtered } = useGetTabsContext();
    const dispatch = useTabsDispatch();

    return (
        <MemoizedTabsListingsLocal
            local={local}
            filtered={(filtered as NiftyTab[])}
            isFiltering={isFiltering}
            loading={loading}
            dispatch={dispatch} />
    );
};
