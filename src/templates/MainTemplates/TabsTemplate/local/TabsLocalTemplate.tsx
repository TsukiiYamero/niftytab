import { useGetTabsContext } from '@/contexts/tabs/hooks';
import { MemoizedTabsListingsLocal } from '@/ui/organisms/TabsListings';

export const TabsLocalTemplate = () => {
    const { loading } = useGetTabsContext();
    return <MemoizedTabsListingsLocal
        loading={loading} />;
};
