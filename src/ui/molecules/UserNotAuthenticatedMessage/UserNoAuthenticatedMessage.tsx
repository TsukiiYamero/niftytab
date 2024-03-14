import { useAuthModal } from '@/contexts/authModal';

export const UserNoAuthenticatedMessage = () => {
    const { openAuthModal, setIsSignIn } = useAuthModal();

    const onLoginClick = () => {
        setIsSignIn(true);
        openAuthModal();
    };

    return (
        <div className='text-[#b9b9b9] text-[--font-size-small]'> Please <span className='link-text' onClick={onLoginClick}> login </span> to view your content
        </div>
    );
};
