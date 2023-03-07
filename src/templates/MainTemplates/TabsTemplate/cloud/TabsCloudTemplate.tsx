import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { MemoizedTabsListingsCloud } from '@/ui/organisms/TabsListings';

export const TabsCloudTemplate = () => {
    const { cloud, loading } = useGetTabsContext();
    const dispatch = useTabsDispatch();

    return <MemoizedTabsListingsCloud
        cloud={cloud}
        loading={loading}
        dispatch={dispatch} />;
};
