import { TabsActions } from '@/contexts/tabs';
import { useTabsDispatch } from '@/contexts/tabs/hooks';
import { TabsCloud } from '@/models';
import { useEffect } from 'react';

/**
 * Set Tabs in TabsReducer
 */
export const useSetTabsCloud = (TabsCloud: TabsCloud[] = []) => {
    const dispatch = useTabsDispatch();

    useEffect(() => {
        dispatch({ type: TabsActions.updateCloud, payload: TabsCloud });
        console.log('alaaa', TabsCloud);
    }, [TabsCloud, dispatch]);
};
