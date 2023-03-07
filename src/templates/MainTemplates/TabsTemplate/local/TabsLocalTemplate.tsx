import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { MemoizedTabsListingsLocal } from '@/ui/organisms/TabsListings';

export const TabsLocalTemplate = () => {
    const { local, loading } = useGetTabsContext();
    const dispatch = useTabsDispatch();

    return (
        <MemoizedTabsListingsLocal
            local={local}
            loading={loading}
            dispatch={dispatch} />
    );
};
