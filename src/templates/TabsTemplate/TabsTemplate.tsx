import { useNavigateToLocal } from '@/customHooks/routes/useNavigateToLocalAndSaved';
import { Outlet } from 'react-router-dom';

export const TabsTemplate = () => {
    useNavigateToLocal();

    return <Outlet />;
};
