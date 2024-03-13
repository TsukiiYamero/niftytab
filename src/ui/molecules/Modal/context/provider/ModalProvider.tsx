import type { ReactNode } from 'react';
import { ModalContext } from '../modalContext';

type Props = {
    children: ReactNode;
    isOpen: boolean;
    closable?: boolean;
    CloseFn: () => void;
};

export const ModalProvider = ({ children, CloseFn, isOpen, closable = true }: Props) => {
    return (
        <ModalContext.Provider value={{ isOpen, CloseFn, closable }}>
            {children}
        </ModalContext.Provider>
    );
};
