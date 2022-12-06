import { createContext, Dispatch } from 'react';
import { SnackbarActionType, SnackbarInfo } from './snackbar.types';

export const SnackbarContext = createContext<SnackbarInfo>(null!);

export const SnackbarDispatchContext = createContext<Dispatch<SnackbarActionType> | null>(null);
