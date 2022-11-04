import { TabsActions, TabsActionType } from '@/contexts/tabs';
import { NiftyTab } from '@/models';
import { SimpleLoading } from '@/ui/atoms/Loadings';
import { getAllChromeTabs } from '@/utils/chrome';
import { chromeTabsToNiftyTabs } from '@/utils/tabs';
import { Dispatch, memo, useEffect } from 'react';
import { TabsListings } from '../presentational';

type props = {
  local: NiftyTab[];
  dispatch: Dispatch<TabsActionType>;
  loading: boolean;
}

export const TabsListingsLocal = ({ local, dispatch, loading }: props) => {
  useEffect(() => {
    const getTabs = async () => {
      dispatch({ type: TabsActions.requestTabs });

      const resp = await getAllChromeTabs();
      const dataTabs = chromeTabsToNiftyTabs(resp ?? []);
      console.log('Local', dataTabs);
      dispatch({ type: TabsActions.updatedLocal, payload: dataTabs });
    };
    getTabs();
  }, [dispatch]);

  return (
    <>
      {loading ? <SimpleLoading /> : <TabsListings tabs={local} />}
    </>
  );
};

export const MemoizedTabsListingsLocal = memo(TabsListingsLocal);
