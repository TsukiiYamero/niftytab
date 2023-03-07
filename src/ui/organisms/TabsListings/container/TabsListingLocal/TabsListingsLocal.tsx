import { TabsActions, TabsActionType } from '@/contexts/tabs';
import { NiftyTab } from '@/models';
import { SimpleLoading } from '@/ui/atoms/Loadings';
import { getAllChromeTabs } from '@/utils/chrome';
import { chromeTabsToNiftyTabs } from '@/utils/tabs';
import { Dispatch, useEffect, memo } from 'react';
import { TabsListings } from '../../presentational';

type props = {
  local: NiftyTab[];
  loading: boolean;
  dispatch: Dispatch<TabsActionType>;
}

export const TabsListingsLocal = ({ local, loading, dispatch }: props) => {
  useEffect(() => {
    const getTabs = async () => {
      dispatch({ type: TabsActions.requestTabs });

      const resp = await getAllChromeTabs();
      const dataTabs = chromeTabsToNiftyTabs(resp ?? []);
      dispatch({ type: TabsActions.updateLocal, payload: dataTabs });
    };
    getTabs();
  }, [dispatch]);

  return (
    <>
      {loading ? <SimpleLoading /> : <TabsListings loading={loading} tabs={local} />}
    </>
  );
};

export const MemoizedTabsListingsLocal = memo(TabsListingsLocal);
