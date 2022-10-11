import { StandardButton } from '@/ui/atoms/Buttons';
import { useRef } from 'react'

type Props = {}

const CreateAccount = (props: Props) => {
    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const passwordRepeat = useRef<HTMLInputElement>(null);

    const onCreateAccount = () => {
        if (!username.current || !password.current) return null;
    }

    return (
        <div>
            <h2>Create Account</h2>

            <input ref={username} type="text" name="email" placeholder="example@gmail.com" />
            <input ref={password} type="password" name="password" placeholder="********" />
            <input ref={passwordRepeat} type="password" name="passwordRepeat" placeholder="********" />

            <StandardButton buttonStyle='btn-primary' text={"Sign In"} onClick={onCreateAccount} />
        </div>
    )
}

export default CreateAccount