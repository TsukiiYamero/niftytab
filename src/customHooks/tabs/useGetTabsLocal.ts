import { getAllChromeTabs } from '@/utils';
import { useEffect, useState } from 'react';

export const useGetTabsLocal = () => {
    const [local, setLocal] = useState<chrome.tabs.Tab[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTabs = async () => {
            setLoading(true);

            const resp = await getAllChromeTabs();
            // const dataTabs = chromeTabsToNiftyTabs(resp ?? []);

            setLocal(resp);
            setLoading(false);
        };
        getTabs();
    }, []);

    return { local, loading };
};
