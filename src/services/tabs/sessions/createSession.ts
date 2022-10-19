import { supabase } from '@/api/config';
import { SessionTabsSupabase } from '@/models';
import { DEFAULT_SESSION_NAME } from '../tabs.statics';

export const createSession = async (session: SessionTabsSupabase) => {
    const { data, error } = await supabase.from('sessions').insert([session]);
    return { data, error };
};

export const createDefaultSession = async (userId: string) => {
    const defaultGroup: SessionTabsSupabase = {
        user_id: userId,
        browser_name: DEFAULT_SESSION_NAME
    };

    createSession(defaultGroup);
};
