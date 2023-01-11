import { NiftyTab } from '@/models';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { MemoizedTabsListingsSaved } from '@/ui/organisms/TabsListings';

export const TabsSavedTemplate = () => {
    const { saved, loading, isFiltering, filtered } = useGetTabsContext();
    const dispatch = useTabsDispatch();

    return <MemoizedTabsListingsSaved
        saved={saved}
        filtered={(filtered as NiftyTab[])}
        isFiltering={isFiltering}
        loading={loading}
        dispatch={dispatch} />;
};
