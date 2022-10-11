import { signInWithEmail, signInWithGoogle } from '@/services/auth/auth';
import { StandardButton } from '@/ui/atoms/Buttons'
import { useRef } from 'react'

type Props = {}

const SignIn = (props: Props) => {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordRepeatRef = useRef<HTMLInputElement>(null);

    const onSignIn = async () => {

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) return null;

        const result = await signInWithEmail({ email, password });
        console.log(result);
    }

    const onSignInWithGoogle = async () => {
        const result = await signInWithGoogle();
        console.log(result);
    }


    return (
        <div>
            <h2>Sign In</h2>

            <input ref={emailRef} type="text" name="email" placeholder="example@gmail.com" />
            <input ref={passwordRef} type="text" name="password" placeholder="*******" />

            <StandardButton buttonStyle='btn-primary' text={"Sign In"} onClick={onSignIn} />
            <StandardButton buttonStyle='btn-primary' text={"Sign In With Google"} onClick={onSignInWithGoogle} />
        </div>
    )
}

export default SignIn