import { signUpWithEmail } from '@/services/auth/auth';
import { StandardButton } from '@/ui/atoms/Buttons';
import { useRef } from 'react'

type Props = {}

const CreateAccount = (props: Props) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordRepeatRef = useRef<HTMLInputElement>(null);

    const onCreateAccount = async () => {

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !password) return null;

        const result = await signUpWithEmail({ email, password });
        console.log(result);
    }

    return (
        <div>
            <h2>Create Account</h2>

            <input ref={emailRef} type="email" name="email" placeholder="example@gmail.com" />
            <input ref={passwordRef} type="password" name="password" placeholder="********" />
            <input ref={passwordRepeatRef} type="password" name="passwordRepeat" placeholder="********" />

            <StandardButton buttonStyle='btn-primary' text={"Sign In"} onClick={onCreateAccount} />
        </div>
    )
}

export default CreateAccount