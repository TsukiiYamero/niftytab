import { useAuthModal } from '@/contexts/authModal';
import { } from 'react';

type Props = {}

export const TabsListingsNotUser = (props: Props) => {
    const { openAuthModal, setIsSignIn } = useAuthModal();

    const onLoginClick = () => {
        setIsSignIn(true);
        openAuthModal();
    };

    return (
        <div className='center-content'> Please <span className='link-text' onClick={onLoginClick}> login </span> to view your saved tabs
        </div>
    );
};
