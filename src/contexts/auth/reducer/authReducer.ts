import { AuthActions } from '../auth.types';
import type { AuthActionType, AuthInitialState } from '../auth.types';

export const authInitialState: AuthInitialState = {
    errorMessage: '',
    loading: false,
    token: '',
    user: undefined
};

export const authReducer = (
    state = authInitialState,
    action: AuthActionType
) => {
    switch (action.type) {
        case AuthActions.requestLogin:
            return {
                ...authInitialState,
                loading: true
            };
        case AuthActions.resetMsg:
            return {
                ...state,
                loading: false,
                errorMessage: ''
            };
        case AuthActions.loginSuccess:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                errorMessage: '',
                loading: false
            };
        case AuthActions.logout:
            return {
                ...authInitialState,
                loading: false
            };

        case AuthActions.loginError:
            return {
                ...state,
                errorMessage: action.payload,
                loading: false
            };

        default:
            throw new Error('Unhandled action type');
    }
};
