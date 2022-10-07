import { TabSmallView } from "@/ui/atoms/TabSmallView"
import { useEffect, useState } from "react"

type ChromeTabs = {
    active: boolean;
    url: string;
    discarded: boolean;
    favIconUrl: string;
    groupId: number;
    id: number;
    title: string;
    index: number;
    pinned: true;
    selected: boolean;
    mutedInfo?: { muted: boolean };
    height?: number;
    audible?: boolean;
    highlighted?: boolean;
    autoDiscardable?: boolean;
    status?: string;
    incognito?: boolean;
    width?: number;
    windowId?: number;
}

export const TabsContainer = () => {

    const [tabs, setTabs] = useState<ChromeTabs[]>();

    useEffect(() => {
        const getTabs = async () => {
            const resp = await fetch('https://run.mocky.io/v3/bc8a8ae6-323e-4fac-bfcb-37f9d27713e9');
            const dataTabs = await resp.json();
            setTabs(dataTabs);
        }
        getTabs();

    }, [])


    return (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '9px', padding: '10px 1px', flexWrap: 'wrap', overflow: 'hidden' }}>
            {
                tabs && tabs.map((tab) => (<TabSmallView
                    key={tab.id}
                    title={tab.title}
                    urlText={tab.url}
                    imgSrc={tab.favIconUrl} />
                ))
            }
        </div>
    )
}