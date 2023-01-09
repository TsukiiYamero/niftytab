import { ReadGroupsWithFiltering2, readTabsWithFilter } from '@/services/tabs';
import { useCallback } from 'react';
import { useFetchWithCallback } from '../useFetchWithCallback';

export const useGetTabsByFilter = () => {
    const { callApi: fetchGetTabs } = useFetchWithCallback();
    /*
     *   Get Tabs From supabase, @column can be '' and will return all Tabs
     */
    const getTabsFromSupabaseBySessionId = useCallback(async (column: string, equalTo?: string | number) => {
        const filter: ReadGroupsWithFiltering2 = {
            eq: {
                column,
                equalTo
            }
        };

        const result = await fetchGetTabs(readTabsWithFilter, filter);

        return result;
    }, [fetchGetTabs]);

    return getTabsFromSupabaseBySessionId;
};
