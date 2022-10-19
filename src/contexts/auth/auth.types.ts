
// innerType
export interface AuthUser {
    email: string;
    id: string;
    avatarUrl: string;
    fullName: string;
}

export type AuthInitialState = {
    token: string;
    user: AuthUser | undefined;
    loading: boolean;
    errorMessage: string;
};

export type AuthActionType =
    | { type: AuthActions.requestLogin }
    | { type: AuthActions.loginSuccess; payload: AuthLoginData }
    | { type: AuthActions.logout }
    | { type: AuthActions.loginError; payload: string };

export enum AuthActions {
    requestLogin = 'request_login',
    loginSuccess = 'login_success',
    logout = 'logout',
    loginError = 'login_error'
}

export interface AuthLoginData {
    user: AuthUser;
    token: string;
}

export interface AuthData {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
}

export interface UserCredentials {
    email: string;
    password: string;
}
