import { TabsActions } from '@/contexts/tabs';
import { useTabsDispatch } from '@/contexts/tabs/hooks';
import { useEffect } from 'react';
import { useGetSessionsCloud } from './useGetSessionsCloud';

export const useSetSessionsCloud = () => {
    const dispatch = useTabsDispatch();
    const { sessionsCloud } = useGetSessionsCloud();

    useEffect(() => {
        const getSessions = async () => {
            dispatch({ type: TabsActions.requestTabs });
            dispatch({ type: TabsActions.updateSessions, payload: sessionsCloud });
            dispatch({ type: TabsActions.finishRequestTabs });
        };

        getSessions();
    }, [dispatch, sessionsCloud]);
};
