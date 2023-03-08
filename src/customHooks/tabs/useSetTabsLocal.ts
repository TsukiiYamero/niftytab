import { TabsActions } from '@/contexts/tabs';
import { useTabsDispatch } from '@/contexts/tabs/hooks';
import { NiftyTab } from '@/models';
import { useEffect } from 'react';

/**
 * Set tabs in local Tabs Reducer
 * @param local
 */
export const useSetTabsLocal = (tabs: NiftyTab[] = []) => {
    const dispatch = useTabsDispatch();

    useEffect(() => {
        dispatch({ type: TabsActions.updateLocal, payload: tabs });
    }, [dispatch, tabs]);
};
