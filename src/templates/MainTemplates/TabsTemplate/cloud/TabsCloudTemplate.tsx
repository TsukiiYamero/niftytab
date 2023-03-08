import { useGetTabsContext } from '@/contexts/tabs/hooks';
import { MemoizedTabsListingsCloud } from '@/ui/organisms/TabsListings';

export const TabsCloudTemplate = () => {
    const { loading } = useGetTabsContext();

    return <MemoizedTabsListingsCloud
        loading={loading} />;
};
