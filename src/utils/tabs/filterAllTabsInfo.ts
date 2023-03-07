import { AllTabsInfo } from '@/models';
import { filterTabsByTitleOrUrl } from './filterTabsByTitleOrUrl';

export const filterAllTabsInfo = (AllTabsInfo: AllTabsInfo[] = [], query: string): AllTabsInfo[] => {
    const newList: AllTabsInfo[] = [];

    AllTabsInfo.forEach(group => {
        const listItemsFound = filterTabsByTitleOrUrl(group.tabs, query);

        if (listItemsFound.length < 0) return;

        newList.push({
            ...group,
            tabs: listItemsFound
        });
    });

    return newList;
};
