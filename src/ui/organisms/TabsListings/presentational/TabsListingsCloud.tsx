import { NiftyTab } from '@/models';
import { OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { TabsListing } from './TabsListing';
import { ListingsGrid } from './ListingsGrid.styled';

import './tabs_presentational.css';
import { SimpleLoading } from '@/ui/atoms/Loadings';
import { ContentNotFound } from '@/ui/atoms/ContentNotFound';

type Props = {
    tabs: NiftyTab[];
    loading?: boolean;
    makeTabsOptsList?: (tab: NiftyTab) => OptionBtnMenuList[];
};

export const TabsListings = ({ tabs = [], loading = false, makeTabsOptsList }: Props) => {
    return (
        <>
            {
                loading
                    ? <SimpleLoading />
                    : <ContentNotFound condition={tabs.length > 0}>
                        <ListingsGrid>
                            {tabs.map((tab) => (
                                <TabsListing key={tab.refererId} tab={tab} makeTabsOptsList={makeTabsOptsList ? makeTabsOptsList(tab) : []} />
                            ))}
                        </ListingsGrid>
                    </ ContentNotFound>
            }
        </>
    );
};
