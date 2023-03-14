import { SimpleLoading } from '@/ui/atoms/Loadings';
import { memo } from 'react';
import { TabsListings } from '../../presentational';
import { useGetTabsCloud, useGetTabsLocal } from '@/customHooks/tabs';

export const TabsListingsLocal = () => {
  // fetching cloud because can search inmediately in local & cloud
  useGetTabsCloud();
  const { local, loading } = useGetTabsLocal();

  return (
    <>
      {loading ? <SimpleLoading /> : <TabsListings loading={loading} tabs={local} />}
    </>
  );
};

export const MemoizedTabsListingsLocal = memo(TabsListingsLocal);
