import { useAuthState } from '@/contexts/auth';
import { IconButtonSimple } from '@/ui/atoms/Buttons';
import { UserIcon } from '@/ui/atoms/icons';
import { Modal, useModal } from '@/ui/molecules/Modal';
import { useState } from 'react';
import CreateAccount from './CreateAccount/CreateAccount';
import { LogOut } from './LogOut/LogOut';
import SignIn from './SignIn/SignIn';

export const Account = () => {
    const { user } = useAuthState();
    const { isOpen, openModal, closeModal } = useModal();
    const {
        isOpen: isOpen2,
        openModal: openModal2,
        closeModal: closeModal2
    } = useModal();

    const [signIn, setSignIn] = useState(true);

    const onUserClick = () => {
        !user ? openModal() : openModal2();
    };

    const onChangeSign = () => {
        setSignIn(!signIn);
    };

    /*     const onCloseModal = useCallback(() => {
            closeModal();
        }, [closeModal]); */

    return (
        <div>
            <IconButtonSimple onClick={onUserClick}>
                <UserIcon></UserIcon>
            </IconButtonSimple>

            <Modal isOpen={isOpen} closeByIcon={true} onClose={closeModal}>
                <div>
                    {signIn ? <SignIn /> : <CreateAccount />}

                    <span onClick={onChangeSign}>dot have an account yet?</span>
                </div>
            </Modal>

            <Modal isOpen={isOpen2} closeByIcon={true} onClose={closeModal2}>
                <div>
                    <h2>Profile</h2>
                    <LogOut />
                </div>
            </Modal>
        </div>
    );
};
