import { useAuthDispatch } from '@/contexts/auth';
import { startSignOut } from '@/contexts/auth/thunks/signOut';
import { StandardButton } from '@/ui/atoms/Buttons';
import { useModalContext } from '@/ui/molecules/Modal';
import { MouseEvent } from 'react';

export const LogOut = () => {
    const dispatch = useAuthDispatch();
    const { closeModal } = useModalContext();

    const onLogout = async (
        _: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
        const isOk = await startSignOut(dispatch);
        isOk && closeModal();
    };

    return (
        <StandardButton
            buttonStyle="btn-primary"
            text="Logout"
            onClick={onLogout}
        />
    );
};
