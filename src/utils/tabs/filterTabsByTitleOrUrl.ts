import { NiftyTab } from '@/models';

export const filterTabsByTitleOrUrl = (tabs: NiftyTab[] | chrome.tabs.Tab[], keyword: string) =>
    (tabs as NiftyTab[]).filter((tab) =>
        tab.title.toLowerCase().includes(keyword.toLowerCase()) ||
        tab.url.includes(keyword)
    );
