import { useContext } from 'react';
import { ModalContext } from '../modalContext';

export const useModalContext = () => {
    const { CloseFn, closable, isOpen } = useContext(ModalContext);

    return { closeModal: CloseFn, closable, isOpen };
};
