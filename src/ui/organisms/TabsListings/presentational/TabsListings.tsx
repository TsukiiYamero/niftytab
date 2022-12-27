import { NiftyTab } from '@/models';
import { OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { TabsListing } from './TabsListing';
import { TabsListingsGrid } from './TabsListingsGrid.styled';
import { TabsNotFound } from './TabsNotFound';

import './tabs_presentational.css';

type Props = {
    tabs: NiftyTab[];
    makeTabsOptsList?: (tab: NiftyTab) => OptionBtnMenuList[];
};

export const TabsListings = ({ tabs = [], makeTabsOptsList }: Props) => {
    return (
        <>
            {
                tabs.length > 0
                    ? <TabsListingsGrid>
                        {tabs.map((tab) => (
                            <TabsListing key={tab.refererId} tab={tab} makeTabsOptsList={makeTabsOptsList} />
                        ))}
                    </TabsListingsGrid>
                    : <TabsNotFound />
            }
        </>
    );
};
