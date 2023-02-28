import { useAuthState } from '@/contexts/auth';
import { UserNoAuthenticatedMessage } from '@/ui/molecules/UserNotAuthenticatedMessage';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
}

/**
 * Show the `children` if the user is logged in
 */
export const AuthenticatedContent = ({ children }: Props) => {
    const { user } = useAuthState();

    if (user) return <>{children}</>;

    return <UserNoAuthenticatedMessage />;
};
