/* eslint-disable @typescript-eslint/no-unused-vars */
import { Modal, useModal } from '@/ui/molecules/Modal';
import { useState } from 'react';
import { LoginForm } from './Login';
import { ForgotPasswordLayout } from './ForgotPasswordLayout';
import { useAuthHandler } from './useAuthHandler';
import { LoginContainer } from './Login/LoginContainer';

export const SignInSignUp = ({ signIn = true }: { signIn: boolean }) => {
    return (
        <>
            <LoginContainer isInitialSigIn={signIn} />
        </>
    );
};
