import { type ReactNode, useCallback, useState } from 'react';
import { AuthModalContext } from '../authModalContext';
import { useAuthDispatch, useAuthState } from '@/contexts/auth/hooks';
import { AuthActions } from '@/contexts/auth/auth.types';
import { SignInSignUp } from '@/ui/molecules/SignInSignUp';
import { Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';

type Props = {
    children: ReactNode;
}

export const AuthModalProvider = ({ children }: Props) => {
    const dispatch = useAuthDispatch();
    const { user } = useAuthState();
    const [isSignIn, setIsSignIn] = useState(true);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const onCloseModal = () => {
        dispatch({ type: AuthActions.resetMsg });
        onClose();
    };

    const onOpenModal = useCallback(() => {
        if (user) return;

        onOpen();
    }, [onOpen, user]);

    return (
        <AuthModalContext.Provider value={{
            isOpen,
            setIsSignIn,
            closeModal: onCloseModal,
            openModal: onOpenModal
        }}>

            {children}

            <Modal
                isOpen={isOpen}
                isDismissable={false}
                onOpenChange={onCloseModal}
                backdrop='blur'
                size='sm'
            >
                <ModalContent>
                    <ModalBody>
                        <SignInSignUp signIn={isSignIn} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </AuthModalContext.Provider>
    );
};
