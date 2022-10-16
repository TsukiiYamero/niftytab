import { supabase } from '@/api/config';

export const signInWithGoogle = async () => {
    const result = await supabase.auth.signInWithOAuth({
        provider: 'google'
    });

    return result;
};
