import { TabSectionFilter, TypeOfStore } from '@/contexts/tabs';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { MemoizedTabsListingsLocal } from './TabsListingsLocal';
import { MemoizedTabsListingsCloud } from './TabsListingsCloud';
import { SessionListingCloud } from './SessionListingCloud/SessionListingCloud';
import { NiftyTab } from '@/models';

export const TabsListingsContainer = () => {
    const { typeOfStore, tabSection, local, cloud, loading, isFiltering, filtered } = useGetTabsContext();
    const dispatch = useTabsDispatch();

    return (<>
        {tabSection === TabSectionFilter.tabs
            ? typeOfStore === TypeOfStore.local
                ? <MemoizedTabsListingsLocal
                    local={local}
                    filtered={(filtered as NiftyTab[])}
                    isFiltering={isFiltering}
                    loading={loading}
                    dispatch={dispatch} />
                : <MemoizedTabsListingsCloud
                    cloud={cloud}
                    loading={loading}
                    dispatch={dispatch} />
            : <SessionListingCloud />
        }
    </>);
};
