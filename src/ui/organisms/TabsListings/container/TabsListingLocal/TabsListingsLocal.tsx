import { TabsActions, TabsActionType } from '@/contexts/tabs';
import { NiftyTab } from '@/models';
import { SimpleLoading } from '@/ui/atoms/Loadings';
import { getAllChromeTabs } from '@/utils/chrome';
import { chromeTabsToNiftyTabs } from '@/utils/tabs';
import { Dispatch, useEffect, memo } from 'react';
import { TabsListings } from '../../presentational';

type props = {
  local: NiftyTab[];
  filtered: NiftyTab[];
  isFiltering: boolean;
  loading: boolean;
  dispatch: Dispatch<TabsActionType>;
}

export const TabsListingsLocal = ({ local, loading, filtered, isFiltering, dispatch }: props) => {
  useEffect(() => {
    const getTabs = async () => {
      dispatch({ type: TabsActions.requestTabs });

      const resp = await getAllChromeTabs();
      const dataTabs = chromeTabsToNiftyTabs(resp ?? []);
      dispatch({ type: TabsActions.updateLocal, payload: dataTabs });
    };
    getTabs();
  }, [dispatch]);

  const tabsToShow = isFiltering ? filtered : local;

  return (
    <>
      {loading ? <SimpleLoading /> : <TabsListings loading={loading} tabs={tabsToShow} />}
    </>
  );
};

export const MemoizedTabsListingsLocal = memo(TabsListingsLocal);
