import { supabase } from '@/api/config';

/**
 *
 * {
        email: "new@email.com",
        password: "new-password",
        data: { hello: 'world' }
      }
 * @param data
 * @returns
 */

export const updateProfile = async (controller: AbortController, { password, email }: { password?: string, email?: string }) => {
    if (!password && !email) return {
        data: [], error: null
    };

    return await supabase.auth.updateUser({
        password,
        email
    });
};

export const setSessionByToken = async (controller: AbortController, token: string) => {
    if (!token || token.trim().length === 0) return {
        data: [], error: null
    };

    return await supabase.auth.setSession({
        access_token: token,
        refresh_token: ''
    });
};

export const resetPassword = async (controller: AbortController, email: string) => {
    if (!email || email.length === 0) return {
        data: [], error: null
    };

    return await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://niftytab.netlify.app/password-recovery'
    });
};
