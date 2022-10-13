import { ChromeTabs } from '@/models';
import { TabsListing } from './TabsListing';
import { TabsListingsGrid } from './TabsListingsGrid.styled';

type Props = {
    tabs: ChromeTabs[];
};

export const TabsListings = ({ tabs = [] }: Props) => {
    return (
        <TabsListingsGrid>
            {tabs.map((tab) => (
                <TabsListing key={tab.id} tab={tab} />
            ))}
        </TabsListingsGrid>
    );
};
