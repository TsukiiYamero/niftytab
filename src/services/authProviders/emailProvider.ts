import type { LoginWithEmailSupabaseResponse } from '@/models/auth.types';
import type { UserCredentials } from '@/contexts/auth';

import { supabase } from '@/api/config';
import { ValidationError, handleErrorsAuth } from '@/errors/authError';

export const signUpWithEmail = async (data: UserCredentials): Promise<LoginWithEmailSupabaseResponse> => {
    try {
        const result = await supabase.auth.signUp(data);

        if (result.error) {
            throw new ValidationError(result.error.message);
        }
        return result;
    } catch (error: any) {
        return handleErrorsAuth(error);
    }
};

export const signInWithEmail = async (data: { email: string; password: string }): Promise<LoginWithEmailSupabaseResponse> => {
    try {
        const result = await supabase.auth.signInWithPassword(data);

        if (result.error) {
            throw new ValidationError(result.error.message);
        }

        return result;
    } catch (error: any) {
        return handleErrorsAuth(error);
    }
};
