import { NiftyTab } from '@/models';
import { OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { TabsListing } from './TabsListing';
import { TabsListingsGrid } from './TabsListingsGrid.styled';

type Props = {
    tabs: NiftyTab[];
    makeTabsOptsList?: (tab: NiftyTab) => OptionBtnMenuList[];
};

export const TabsListings = ({ tabs = [], makeTabsOptsList }: Props) => {
    return (
        <TabsListingsGrid>
            {tabs.map((tab) => (
                <TabsListing key={tab.refererId} tab={tab} makeTabsOptsList={makeTabsOptsList} />
            ))}
        </TabsListingsGrid>
    );
};
