import { TabsCloud } from '@/models';
import { filterTabsByTitleOrUrl } from './filterTabsByTitleOrUrl';

export const filterAllTabsInfo = (AllTabsInfo: TabsCloud[] = [], query: string): TabsCloud[] => {
    const newList: TabsCloud[] = [];

    AllTabsInfo.forEach(group => {
        const listItemsFound = filterTabsByTitleOrUrl(group.tabs, query);

        if (listItemsFound.length === 0) return;

        newList.push({
            ...group,
            tabs: listItemsFound
        });
    });

    return newList;
};
