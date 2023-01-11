import { TabsActions, TypeOfStore } from '@/contexts/tabs';
import { useTabsDispatch } from '@/contexts/tabs/hooks';
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
        navigate('local');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);
};

/**
 * Navigate to saved the first time the comp is rendered.
 * think in mind the route is relative
 */
export const useNavigateToSaved = () => {
    const navigate = useNavigate();
    const dispatch = useTabsDispatch();

    useEffect(() => {
        dispatch({ type: TabsActions.changeTypeOfStore, payload: TypeOfStore.saved });
        navigate('saved');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
