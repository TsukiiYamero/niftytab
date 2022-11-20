import { supabase } from '@/api/config';
import { TabsSupabase } from '@/models';

export const updateTabs = (controller: AbortController, tab: TabsSupabase) => {
    if (!tab) return {
        data: [], error: null
    };

    const columnsToUpdate: TabsSupabase = {
        active: tab.active,
        discarded: tab.discarded,
        group_id: tab.group_id,
        favicon_url: tab.favicon_url,
        index: tab.index,
        pinned: tab.pinned,
        session_id: tab.session_id,
        title: tab.title,
        url: tab.url,
        id: tab.id,
        user_id: tab.user_id
    };

    return supabase
        .from('tabs')
        .update<TabsSupabase>(columnsToUpdate)
        .eq('id', tab.id)
        .abortSignal(controller.signal);
};
