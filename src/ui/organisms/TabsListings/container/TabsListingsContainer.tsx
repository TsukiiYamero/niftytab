import { TabSectionFilter, TabsStoredType } from '@/contexts/tabs';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { MemoizedTabsListingsLocal } from './TabsListingsLocal';
import { MemoizedTabsListingsSaved } from './TabsListingsSaved';
import { SectionGroupings } from './SectionGroupings/SectionGroupings';
import { NiftyTab } from '@/models';

export const TabsListingsContainer = () => {
    const { typeOfStore, tabSection, local, saved, loading, isFiltering, filtered } = useGetTabsContext();
    const dispatch = useTabsDispatch();

    return (<>
        {tabSection === TabSectionFilter.tabs
            ? typeOfStore === TabsStoredType.local
                ? <MemoizedTabsListingsLocal
                    local={local}
                    filtered={(filtered as NiftyTab[])}
                    isFiltering={isFiltering}
                    loading={loading}
                    dispatch={dispatch} />
                : <MemoizedTabsListingsSaved
                    saved={saved}
                    filtered={(filtered as NiftyTab[])}
                    isFiltering={isFiltering}
                    loading={loading}
                    dispatch={dispatch} />
            : <SectionGroupings />
        }
    </>);
};
