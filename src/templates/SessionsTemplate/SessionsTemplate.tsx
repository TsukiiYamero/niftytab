import { useNavigateToSaved } from '@/customHooks/routes/useNavigateToLocalAndSaved';
import { Outlet } from 'react-router-dom';

export const SessionsTemplate = () => {
    useNavigateToSaved();

    return (
        <Outlet />
    );
};
