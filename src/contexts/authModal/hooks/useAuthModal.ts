import { useContext } from 'react';
import { AuthModalContext } from '../authModalContext';

export const useAuthModal = () => {
    const { isOpen, openModal, closeModal, setIsSignIn } = useContext(AuthModalContext);

    return {
        isOpen,
        closeModal,
        openAuthModal: openModal,
        setIsSignIn
    };
};
