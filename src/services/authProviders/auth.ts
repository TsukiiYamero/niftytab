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

export const updateProfile = (controller: AbortController, { password, email }: { password?: string, email?: string }) => {
    if (!password && !email) return {
        data: [], error: null
    };

    return supabase.auth.updateUser({
        password,
        email
    });
};

export const setSessionByToken = (controller: AbortController, token: string) => {
    if (!token || token.trim().length === 0) return {
        data: [], error: null
    };

    return supabase.auth.setSession({
        access_token: token,
        refresh_token: ''
    });
};

export const resetPassword = (controller: AbortController, email: string) => {
    if (!email || email.length === 0) return {
        data: [], error: null
    };

    return supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://niftytab.netlify.app/password-recovery'
    });
};
