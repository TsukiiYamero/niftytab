import { getAllBrowserTabs } from '@/utils';
import { useEffect, useState } from 'react';

export const useGetAllTabs = () => {
    const [tabs, setTabs] = useState<chrome.tabs.Tab[]>([]);
    const [loading, setLoading] = useState(true);

    const getTabs = async () => {
        setLoading(true);

        const resp = await getAllBrowserTabs();

        setTabs(resp);
        setLoading(false);
    };

    useEffect(() => {
        getTabs();
    }, []);

    const updateTabs = async () => {
        getTabs();
    };

    return { tabs, loading, updateTabs };
};
