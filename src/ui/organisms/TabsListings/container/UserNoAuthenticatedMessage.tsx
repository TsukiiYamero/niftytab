import { useAuthModal } from '@/contexts/authModal';

export const UserNoAuthenticatedMessage = () => {
    const { openAuthModal, setIsSignIn } = useAuthModal();

    const onLoginClick = () => {
        setIsSignIn(true);
        openAuthModal();
    };

    return (
        <div className='center-content'> Please <span className='link-text' onClick={onLoginClick}> login </span> to view your content
        </div>
    );
};
