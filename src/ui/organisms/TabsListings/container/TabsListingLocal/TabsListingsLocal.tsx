import { SimpleLoading } from '@/ui/atoms/Loadings';
import { memo } from 'react';
import { TabsListings } from '../../presentational';
import { useGetTabsCloud } from '@/customHooks/tabs/useGetTabsCloud';
import { useSetTabsCloud } from '@/customHooks/tabs/useSetTabsCloud';
import { useGetTabsLocal } from '@/customHooks/tabs/useGetTabsLocal';
import { useSetTabsLocal } from '@/customHooks/tabs/useSetTabsLocal';

type props = {
  loading: boolean;
}

export const TabsListingsLocal = ({ loading }: props) => {
  // fetching cloud because can search inmediately in local & cloud
  const { tabsCloud } = useGetTabsCloud();
  useSetTabsCloud(tabsCloud);
  const tabsLocal = useGetTabsLocal();
  useSetTabsLocal(tabsLocal);

  return (
    <>
      {loading ? <SimpleLoading /> : <TabsListings loading={loading} tabs={tabsLocal} />}
    </>
  );
};

export const MemoizedTabsListingsLocal = memo(TabsListingsLocal);
