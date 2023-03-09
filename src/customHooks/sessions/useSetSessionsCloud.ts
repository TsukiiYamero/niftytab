import { TabsActions } from '@/contexts/tabs';
import { useTabsDispatch } from '@/contexts/tabs/hooks';
import { SessionCloud } from '@/models';
import { useEffect } from 'react';

export const useSetSessionsCloud = (SessionCloud: SessionCloud[] = []) => {
    const dispatch = useTabsDispatch();

    useEffect(() => {
        dispatch({ type: TabsActions.updateSessions, payload: SessionCloud });
    }, [SessionCloud, dispatch]);
};
