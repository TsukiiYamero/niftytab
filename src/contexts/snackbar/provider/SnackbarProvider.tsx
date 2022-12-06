import { GlobalSnackbar } from '@/ui/atoms/GlobalSnackbar';
import { ReactNode, useReducer } from 'react';
import { snackbarInitialState, snackbarReducer } from '../reducer';
import { SnackbarContext, SnackbarDispatchContext } from '../snackbarContext';

type Props = {
    children: ReactNode
}

export const SnackbarProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(snackbarReducer, snackbarInitialState);

    return (
        <SnackbarContext.Provider value={state}>
            <SnackbarDispatchContext.Provider value={dispatch}>
                <GlobalSnackbar />
                {children}
            </SnackbarDispatchContext.Provider>
        </SnackbarContext.Provider>
    );
};
