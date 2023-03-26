import { SimpleLoading } from '@/ui/atoms/Loadings';
import { memo } from 'react';
import { useGetTabsCloud, useGetTabsLocal } from '@/customHooks/tabs';
import { useTabsLocalOptionsList } from '@/customHooks/tabs/useTabsLocalOptionsList';
import { TabsListingsLocal } from '../../presentational/TabsListingsLocal';

export const TabsLocalContainer = () => {
  // fetching cloud because can search inmediately in local & cloud
  useGetTabsCloud();
  const makeTabsOptsList = useTabsLocalOptionsList();
  const { local, loading } = useGetTabsLocal();

  return (
    <>
      {
        loading
          ? <SimpleLoading />
          : <TabsListingsLocal loading={loading} tabs={local} makeTabsOptsList={makeTabsOptsList} />
      }
    </>
  );
};

export const MemoizedTabsListingsLocal = memo(TabsLocalContainer);
