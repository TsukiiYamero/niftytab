import { useAuthModal } from '@/contexts/authModal';

export const TabsListingsNotUser = () => {
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
