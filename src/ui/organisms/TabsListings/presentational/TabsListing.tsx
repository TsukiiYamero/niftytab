import { NiftyTab } from '@/models';
import { TabSmallView } from '@/ui/atoms/TabSmallView';

type Props = {
    tab: NiftyTab;
};

export const TabsListing = ({ tab }: Props) => {
    return (
        <TabSmallView
            title={tab.title ?? ''}
            urlText={tab.url ?? ''}
            imgSrc={tab.favIconUrl ?? ''}
        />
    );
};
