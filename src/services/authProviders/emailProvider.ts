import { supabase } from '@/api/config';
import { AuthResponse } from '@supabase/supabase-js';

export const signUpWithEmail = async (data: any) => {
    let result: AuthResponse = {
        data: {
            session: null,
            user: null
        },
        error: null
    };

    try {
        result = await supabase.auth.signUp(data);
    } catch (error) {
        console.error(error);
    }

    return result;
};

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
};
