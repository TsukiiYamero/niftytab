import { supabase } from '@/api/config';

export const deleteSessions = (controller: AbortController, sessionId: string) => {
    if (!sessionId) return {
        data: [], error: null
    };

    return supabase
        .from('sessions')
        .delete()
        .eq('id', sessionId)
        .abortSignal(controller.signal);
};
