import { createContext } from 'react';
import { ModalInitialState } from './modal.types';

export const ModalContext = createContext<ModalInitialState>({
    closable: true,
    CloseFn: () => { },
    isOpen: false
});
