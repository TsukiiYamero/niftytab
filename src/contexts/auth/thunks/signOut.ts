import { signOut } from '@/services/authProviders';
import { Dispatch } from 'react';
import { AuthActions, AuthActionType } from '../auth.types';
import { TabsActionType, TabsActions } from '@/contexts/tabs';

export const startSignOut = async (authDispatch: Dispatch<AuthActionType>, tabsDispatch: Dispatch<TabsActionType>) => {
    authDispatch({ type: AuthActions.requestLogin });

    try {
        await signOut();
    } catch (error) {
        authDispatch({ type: AuthActions.loginError, payload: 'Something went wrong, please try again later.' });
    }

    tabsDispatch({ type: TabsActions.resetTabs });
    authDispatch({ type: AuthActions.logout });

    return true;
};
