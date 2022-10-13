import { ReactNode, useReducer } from 'react';
import { AuthDispatchContext, AuthStateContext } from '../authContexts';
import { authInitialState, authReducer } from '../reducer';

type props = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: props) => {
    const [user, dispatch] = useReducer(authReducer, authInitialState);

    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};
