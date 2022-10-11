import { StandardButton } from '@/ui/atoms/Buttons'
import { useRef } from 'react'

type Props = {}

const SignIn = (props: Props) => {

    const username = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);

    const onSignIn = () => {
        if (!username.current || !password.current) return null;


    }

    return (
        <div>
            <h2>Sign In</h2>

            <input ref={username} type="text" name="email" placeholder="example@gmail.com" />
            <input ref={password} type="text" name="password" placeholder="*******" />

            <StandardButton buttonStyle='btn-primary' text={"Sign In"} onClick={onSignIn} />
        </div>
    )
}

export default SignIn