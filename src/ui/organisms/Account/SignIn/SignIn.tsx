// import { startSignInWithEmail } from '@/contexts/auth/thunks/signInWithEmail';
import { startSignInWithEmail, useAuthDispatch, useAuthState } from '@/contexts/auth';
import { useFormAdvanced } from '@/customHooks/useFormAdvanced';
import { signInWithGoogle } from '@/services/authProviders';
import { StandardButton } from '@/ui/atoms/Buttons';
import { useModalContext } from '@/ui/molecules/Modal';
import { authValidationsBasic } from '@/utils/authValidations';
import { useEffect, useRef } from 'react';

type SignUpForm = { email: string, password: string }

const SignIn = () => {
    const dispatch = useAuthDispatch();
    const { loading, errorMessage } = useAuthState();
    const { closeModal } = useModalContext();

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const { data, errors, isValid, pristine, handelSetData } = useFormAdvanced<SignUpForm>({
        ...authValidationsBasic,
        initialValues: {
            email: emailRef.current?.value ?? '',
            password: passwordRef.current?.value ?? ''
        }
    });

    useEffect(() => {
        const signIn = async () => {
            if (!isValid) return;

            if (!data?.email || !data?.password) return;

            const userCredentials = {
                email: data.email,
                password: data.password
            };

            const isOK = await startSignInWithEmail(dispatch, userCredentials);
            isOK && closeModal();
        };

        signIn();
    }, [isValid, data, dispatch, closeModal]);

    const onSignIn = async () => {
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        handelSetData({ email, password });
    };

    const onSignInWithGoogle = async () => {
        await signInWithGoogle();
    };

    return (
        <div>

            {loading && <h1>Loading...</h1>}
            {errorMessage && <p>{errorMessage}</p>}

            <h2>Sign In</h2>

            {!pristine && errors.email && <span>{errors.email}</span>}
            {!pristine && errors.password && <span>{errors.password}</span>}

            <form action="">
                <input
                    ref={emailRef}
                    type="text"
                    name="email"
                    placeholder="example@gmail.com"
                />
                <input
                    ref={passwordRef}
                    type="password"
                    name="password"
                    placeholder="*******"
                />

                <StandardButton
                    buttonStyle="btn-primary"
                    text={'Sign In'}
                    onClick={onSignIn}
                />
            </form>

            <StandardButton
                buttonStyle="btn-primary"
                text={'Sign In With Google'}
                onClick={onSignInWithGoogle}
            />
        </div>
    );
};

export default SignIn;
