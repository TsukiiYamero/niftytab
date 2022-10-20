import { supabase } from '@/api/config';
import { TabsSupabase } from '@/models';

export const createAllTabs = async (tabs: TabsSupabase[] = []) => {
    const { data, error } = await supabase
        .from('tabs')
        .insert<TabsSupabase>(tabs);

    return { data, error };
};
