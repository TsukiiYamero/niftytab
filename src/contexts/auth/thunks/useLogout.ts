import { signOut } from '@/services/authProviders';
import { AuthActions } from '../auth.types';
import { TabsActions } from '@/contexts/tabs';
import { useAuthDispatch } from '../hooks';
import { useTabsDispatch } from '@/contexts/tabs/hooks';
import { useCallback } from 'react';

export const useLogOut = () => {
    const authDispatch = useAuthDispatch();
    const tabsDispatch = useTabsDispatch();

    const logOut = useCallback(async () => {
        authDispatch({ type: AuthActions.requestLogin });

        try {
            await signOut();
        } catch (error) {
            authDispatch({ type: AuthActions.loginError, payload: 'Something went wrong, please try again later.' });
        }

        tabsDispatch({ type: TabsActions.resetTabs });
        authDispatch({ type: AuthActions.logout });
    }, [authDispatch, tabsDispatch]);

    return logOut;
};
