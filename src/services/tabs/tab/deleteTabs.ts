import { supabase } from '@/api/config';

export const deleteTabs = (controller: AbortController, refererId: string) => {
    if (!refererId) return {
        data: [], error: null
    };

    return supabase
        .from('tabs')
        .delete()
        .eq('referer_id', refererId)
        .abortSignal(controller.signal);
};

export const deleteTabsBySessionId = (controller: AbortController, sessionId: number) => {
    if (!sessionId) return {
        data: [], error: null
    };

    return supabase
        .from('tabs')
        .delete()
        .eq('session_id', sessionId)
        .abortSignal(controller.signal);
};
