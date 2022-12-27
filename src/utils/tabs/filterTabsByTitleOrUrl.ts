import { NiftyTab } from '@/models';

export const filterTabsByTitleOrUrl = (tabs: NiftyTab[], keyword: string) =>
    tabs.filter((tab) =>
        tab.title.toLowerCase().includes(keyword.toLowerCase()) ||
        tab.url.includes(keyword)
    );
