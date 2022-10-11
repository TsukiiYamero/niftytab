import { supabase } from '@/api/config'
import { AuthError, AuthResponse, OAuthResponse } from '@supabase/supabase-js'


export const signUpWithEmail = async (data: any) => {

    let result: AuthResponse = {
        data: {
            session: null,
            user: null
        },
        error: null
    };

    try {
        result = await supabase.auth.signUp(data)
    } catch (error) {
        console.error(error);
    }

    return result;
}

export const signInWithEmail = async (data: any) => {

    let result: AuthResponse = {
        data: {
            session: null,
            user: null
        },
        error: null
    };

    try {
        result = await supabase.auth.signInWithPassword(data);
    } catch (error) {
        console.error(error);
    }

    return result;
}

export const signInWithGoogle = async () => {

    let result: OAuthResponse = {
        data: {
            provider: 'google',
            url: ''
        },
        error: null
    };

    try {
        result = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        console.log('aaaa', result)
    } catch (error) {
        console.error(error);
    }

    return result;
}

export const signOut = async () => {
    let errorSignOut: { error: AuthError | null } = {
        error: null
    };

    try {
        errorSignOut = await supabase.auth.signOut();
        console.log(errorSignOut);
    } catch (error) {
        console.log(error);
    }

    return errorSignOut;
}

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

export const udateProfile = async (data: any) => {
    try {
        await supabase.auth.updateUser(data)
    } catch (error) {
        console.error(error)
    }
}




