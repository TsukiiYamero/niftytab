import { createContext } from 'react';
import type { ModalInitialState } from './modal.types';

export const ModalContext = createContext<ModalInitialState>({
    closable: true,
    CloseFn: () => { },
    isOpen: false
});
