import { OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { TabsListing } from './TabsListing';
import { ListingsGrid } from './ListingsGrid.styled';

import './tabs_presentational.css';
import { SimpleLoading } from '@/ui/atoms/Loadings';
import { ContentNotFound } from '@/ui/atoms/ContentNotFound';

type Props = {
    tabs: chrome.tabs.Tab[];
    loading?: boolean;
    makeTabsOptsList?: (tab: chrome.tabs.Tab) => OptionBtnMenuList[];
};

export const TabsListingsLocal = ({ tabs = [], loading = false, makeTabsOptsList }: Props) => {
    return (
        <>
            {
                loading
                    ? <SimpleLoading />
                    : <ContentNotFound condition={tabs.length > 0}>
                        <ListingsGrid>
                            {tabs.map((tab) => (
                                <TabsListing key={tab.id} tab={tab} makeTabsOptsList={makeTabsOptsList ? makeTabsOptsList(tab) : []} />
                            ))}
                        </ListingsGrid>
                    </ ContentNotFound>
            }
        </>
    );
};
