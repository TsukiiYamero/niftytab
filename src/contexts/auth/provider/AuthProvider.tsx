import { supabase } from '@/api/config';
import { ReactNode, useEffect, useReducer } from 'react';
import { AuthDispatchContext, AuthStateContext } from '../authContexts';
import { authInitialState, authReducer } from '../reducer';
import { startSetSession } from '../thunks/setSession';

type props = {
    children: ReactNode;
};

export const AuthProvider = ({ children }: props) => {
    const [user, dispatch] = useReducer(authReducer, authInitialState);

    useEffect(() => {
        const setUserCredentials = async () => {
            const resultSession = await supabase.auth.getSession();

            if (resultSession.data?.session)
                startSetSession(dispatch, resultSession);
        };

        setUserCredentials();
    }, []);

    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};
