import { NiftyTab } from '@/models';
import { OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { TabsListing } from './TabsListing';
import { ListingsGrid } from './ListingsGrid.styled';
import { TabsNotFound } from './TabsNotFound';

import './tabs_presentational.css';
import { SimpleLoading } from '@/ui/atoms/Loadings';

type Props = {
    tabs: NiftyTab[];
    loading: boolean;
    makeTabsOptsList?: (tab: NiftyTab) => OptionBtnMenuList[];
};

export const TabsListings = ({ tabs = [], loading, makeTabsOptsList }: Props) => {
    return (
        <>
            {
                loading
                    ? <SimpleLoading />
                    : tabs.length > 0
                        ? <ListingsGrid>
                            {tabs.map((tab) => (
                                <TabsListing key={tab.refererId} tab={tab} makeTabsOptsList={makeTabsOptsList} />
                            ))}
                        </ListingsGrid>
                        : <TabsNotFound />
            }
        </>
    );
};
