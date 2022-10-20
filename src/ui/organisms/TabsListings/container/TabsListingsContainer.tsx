import { ChromeTabs } from '@/models';
import { readTabs } from '@/services/tabs';
import { useEffect, useState } from 'react';
import { TabsListings } from '../presentational/TabsListings';

export const TabsListingsContainer = () => {
    const [tabs, setTabs] = useState<ChromeTabs[]>([]);

    useEffect(() => {
        const getTabs = async () => {
            const resp = await readTabs();

            if (resp.error) {
                console.log(resp.error.message);
                return;
            }

            const dataTabs = resp.data ?? [];
            setTabs(dataTabs);
        };
        getTabs();
    }, []);

    return <TabsListings tabs={tabs} />;
};
