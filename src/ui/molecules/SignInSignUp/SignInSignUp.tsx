import { LoginContainer } from './Login/LoginContainer';

export const SignInSignUp = ({ signIn = true }: { signIn: boolean }) => {
    return (
        <>
            <LoginContainer isInitialSigIn={signIn} />
        </>
    );
};
