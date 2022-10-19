import { supabase } from '@/api/config';
import { TabsSupabase } from '@/models';

export const createTab = async (tab: TabsSupabase) => {
    const { data, error } = await supabase
        .from('tabs')
        .insert<TabsSupabase>([tab]);

    return { data, error };
};
