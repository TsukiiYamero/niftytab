import { getAllBrowserTabs } from '@/utils';
import { useEffect, useState } from 'react';

export const useGetAllTabs = () => {
    const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTabs = async () => {
            setLoading(true);

            const resp = await getAllBrowserTabs();
            // const dataTabs = chromeTabsToNiftyTabs(resp ?? []);

            setTabs(resp);
            setLoading(false);
        };
        getTabs();
    }, []);

    return { tabs, loading };
};
