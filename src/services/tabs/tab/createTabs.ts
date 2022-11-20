import { supabase } from '@/api/config';
import { TabsSupabase } from '@/models';

export const createTabs = (controller: AbortController, tabs: TabsSupabase[] = []) => {
    if (tabs.length === 0) return {
        data: [], error: null
    };

    return supabase
        .from('tabs')
        .insert<TabsSupabase>(tabs)
        .abortSignal(controller.signal);
};
