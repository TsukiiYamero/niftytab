import { useState } from 'react';
import { SignIn } from './SignIn';
import { CreateAccount } from './CreateAccount';

export const SignInSignUp = ({ signIn = true }: { signIn: boolean }) => {
    const [isSignIn, setIsSignIn] = useState(signIn);

    const onSignUp = () => {
        setIsSignIn(false);
    };

    const onSignIn = () => {
        setIsSignIn(true);
    };

    return (
        <div>
            {isSignIn ? <SignIn /> : <CreateAccount />}

            <span onClick={onSignUp}> Don&apos;t have an account yet?</span>
            <br />
            <span onClick={onSignIn}> Already have an account?</span>
        </div>
    );
};
