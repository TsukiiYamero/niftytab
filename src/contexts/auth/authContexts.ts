import { createContext, Dispatch, useContext } from "react";
import { AuthActionType, AuthInitialState } from "./auth.types";
import { authInitialState } from "./reducer";

export const AuthStateContext = createContext<AuthInitialState>(authInitialState);
export const AuthDispatchContext = createContext<Dispatch<AuthActionType>>(null!);

export const useAuthState = () => {
    const context = useContext(AuthStateContext);
    if (!context) throw new Error("useAuthState must be used within a AuthProvider")

    return context;
}

export const useAuthDispatch = () => {
    const context = useContext(AuthDispatchContext);
    if (!context) throw new Error("useAuthDispatch must be used within a AuthProvider")

    return context;
}

