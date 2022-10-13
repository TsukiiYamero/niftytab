import { AuthActions, AuthActionType, AuthInitialState } from '../auth.types';

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
                ...state,
                loading: true
            };
        case AuthActions.loginSuccess:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token
            };
        case AuthActions.logout:
            return {
                ...authInitialState
            };

        case AuthActions.loginError:
            return {
                ...state,
                errorMessage: action.payload
            };

        default:
            throw new Error('Unhandled action type');
    }
};
