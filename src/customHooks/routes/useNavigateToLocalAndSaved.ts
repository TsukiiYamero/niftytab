import { TabsActions, TypeOfStore } from '@/contexts/tabs';
import { useTabsDispatch } from '@/contexts/tabs/hooks';
import { CloudStore, LocalStore } from '@/utils/niftyDefaults';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Navigate to local the first time the comp is rendered.
 * think in mind the route is relative
 */
export const useNavigateToLocal = () => {
    const navigate = useNavigate();
    const dispatch = useTabsDispatch();

    useEffect(() => {
        dispatch({ type: TabsActions.changeTypeOfStore, payload: TypeOfStore.local });
        navigate(LocalStore);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
};

/**
 * Navigate to Cloud the first time the comp is rendered.
 * think in mind the route is relative
 */
export const useNavigateToCloud = () => {
    const navigate = useNavigate();
    const dispatch = useTabsDispatch();

    useEffect(() => {
        dispatch({ type: TabsActions.changeTypeOfStore, payload: TypeOfStore.cloud });
        navigate(CloudStore);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
