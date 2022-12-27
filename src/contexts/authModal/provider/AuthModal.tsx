import { ReactNode, useCallback, useState } from 'react';
import { AuthModalContext } from '../authModalContext';
import { useAuthDispatch, useAuthState } from '@/contexts/auth/hooks';
import { Modal, useModal } from '@/ui/molecules/Modal';
import { AuthActions } from '@/contexts/auth/auth.types';
import { SignInSignUp } from '@/ui/molecules/SignInSignUp';

type Props = {
    children: ReactNode;
}

export const AuthModalProvider = ({ children }: Props) => {
    const dispatch = useAuthDispatch();
    const { user } = useAuthState();
    const [isSignIn, setIsSignIn] = useState(true);

    const { isOpen, openModal, closeModal } = useModal();

    const onCloseModal = () => {
        dispatch({ type: AuthActions.resetMsg });
        closeModal();
    };

    const onOpenModal = useCallback(() => {
        if (user) return;

        openModal();
    }, [openModal, user]);

    return (
        <AuthModalContext.Provider value={{
            isOpen,
            setIsSignIn,
            closeModal,
            openModal: onOpenModal
        }}>

            {children}

            <Modal
                isOpen={isOpen}
                closeByIcon={true}
                closeByClickOutside={false}
                onClose={onCloseModal}
                modalClassSize='custom_modal_login'
            >
                <SignInSignUp signIn={isSignIn} />
            </Modal>
        </AuthModalContext.Provider>
    );
};
