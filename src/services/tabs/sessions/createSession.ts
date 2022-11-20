import { supabase } from '@/api/config';
import { SessionTabsSupabase } from '@/models';
import { DEFAULT_SESSION_NAME } from '../tabs.statics';

export const createSession = (controller: AbortController, session: SessionTabsSupabase) => {
    return supabase.from('sessions').insert([session]).abortSignal(controller.signal);
};

export const createDefaultSession = (controller: AbortController, userId: string) => {
    const defaultSession: SessionTabsSupabase = {
        user_id: userId,
        browser_name: DEFAULT_SESSION_NAME
    };

    return createSession(controller, defaultSession);
};
