import { NiftyTab } from '@/models';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { MemoizedTabsListingsCloud } from '@/ui/organisms/TabsListings';

export const TabsCloudTemplate = () => {
    const { cloud, loading, isFiltering, filtered } = useGetTabsContext();
    const dispatch = useTabsDispatch();

    return <MemoizedTabsListingsCloud
        cloud={cloud}
        filtered={(filtered as NiftyTab[])}
        isFiltering={isFiltering}
        loading={loading}
        dispatch={dispatch} />;
};
