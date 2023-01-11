import { useNavigateToCloud } from '@/customHooks/routes/useNavigateToLocalAndSaved';
import { Outlet } from 'react-router-dom';

export const SessionsTemplate = () => {
    useNavigateToCloud();

    return (
        <Outlet />
    );
};
