import { } from 'react';
import './bottom_login_layout.css';
import { FormHelperText } from '@mui/material';
import { BsGoogle } from 'react-icons/bs';
import Button from '@mui/material/Button';

type Props = {
    isSignIn: boolean,
    onSignUp: () => void,
    onSignIn: () => void,
    googleSignIn: () => void
}

export const BottomLoginLayout = ({ isSignIn, onSignUp, onSignIn, googleSignIn }: Props) => {
    return (
        <div className='bottom-login-container'>
            {isSignIn ? <FormHelperText className='forgot-msg-login'>Forgot your password?</FormHelperText> : null}

            <div className='login-social-media'>
                <div className='line'>
                    <span>OR</span>
                </div>

                <div className='social-media-btns'>
                    <Button fullWidth variant="outlined" onClick={googleSignIn} startIcon={<BsGoogle />}>
                        Continue with Google
                    </Button>
                </div>

                <div className='login-others-opts'>
                    {isSignIn
                        ? <span onClick={onSignUp}> Don&apos;t have an account yet?</span>
                        : <span onClick={onSignIn}> Already a user?</span>}
                </div>
            </div>
        </div>
    );
};
