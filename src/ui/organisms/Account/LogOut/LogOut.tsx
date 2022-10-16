import { useAuthDispatch } from '@/contexts/auth';
import { startSignOut } from '@/contexts/auth/thunks/signOut';
import { StandardButton } from '@/ui/atoms/Buttons';
import { MouseEvent } from 'react';

export const LogOut = () => {
    const dispatch = useAuthDispatch();

    const onLogout = async (
        _: MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
        await startSignOut(dispatch);
    };

    return (
        <StandardButton
            buttonStyle="btn-primary"
            text="Logout"
            onClick={onLogout}
        />
    );
};
