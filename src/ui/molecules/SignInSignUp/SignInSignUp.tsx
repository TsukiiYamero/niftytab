import { useState } from 'react';
import { SignIn } from './SignIn';
import { CreateAccount } from './CreateAccount';
import { BottomLoginLayout } from './BottomLoginLayout';

import './signin_signup.css';
import { signInWithGoogle } from '@/services/authProviders';

export const SignInSignUp = ({ signIn = true }: { signIn: boolean }) => {
    const [isSignIn, setIsSignIn] = useState(signIn);

    const onSignUp = () => {
        setIsSignIn(false);
    };

    const onSignIn = () => {
        setIsSignIn(true);
    };

    const onSignInWithGoogle = async () => {
        await signInWithGoogle();
    };

    return (
        <div className={'container-login'}>
            {isSignIn ? <SignIn /> : <CreateAccount />}
            <BottomLoginLayout isSignIn={isSignIn} onSignUp={onSignUp} onSignIn={onSignIn} googleSignIn={onSignInWithGoogle} />
        </div>
    );
};
