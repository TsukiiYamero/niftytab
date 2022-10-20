import { supabase } from '@/api/config';
import { TabsSupabase } from '@/models';

export const createTab = async (tabs: TabsSupabase[]) => {
    const { data, error } = await supabase
        .from('tabs')
        .insert<TabsSupabase>(tabs);

    return { data, error };
};
