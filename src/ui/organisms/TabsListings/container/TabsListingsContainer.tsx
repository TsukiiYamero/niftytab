import { ChromeTabs } from '@/models';
import { useEffect, useState } from 'react'
import { TabsListings } from '../presentational/TabsListings';

export const TabsListingsContainer = () => {

    const [tabs, setTabs] = useState<ChromeTabs[]>([]);

    useEffect(() => {
        const getTabs = async () => {
            const resp = await fetch('https://run.mocky.io/v3/bc8a8ae6-323e-4fac-bfcb-37f9d27713e9');
            const dataTabs = await resp.json();
            setTabs(dataTabs);
        }
        getTabs();

    }, [])


    return (
        <TabsListings tabs={tabs} />
    )
}