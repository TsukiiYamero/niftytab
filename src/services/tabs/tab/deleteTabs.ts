import { supabase } from '@/api/config';

export const deleteTabs = (controller: AbortController, url: string) => {
    if (!url) return {
        data: [], error: null
    };

    return supabase
        .from('tabs')
        .delete()
        .eq('url', url)
        .abortSignal(controller.signal);
};
