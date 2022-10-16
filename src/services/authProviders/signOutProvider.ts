import { supabase } from '@/api/config';

export const signOut = async () => {
    const errorSignOut = await supabase.auth.signOut();
    return errorSignOut;
};
