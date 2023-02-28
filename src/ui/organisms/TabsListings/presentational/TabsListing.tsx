import { NiftyTab } from '@/models';
import { TabSmallView } from '@/ui/atoms/TabSmallView';
import { OptionBtnMenu, OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';

type Props = {
    tab: NiftyTab;
    makeTabsOptsList: OptionBtnMenuList[];
};

export const TabsListing = ({ tab, makeTabsOptsList }: Props) => {
    return (
        <>
            <TabSmallView
                title={tab.title ?? ''}
                urlText={tab.url ?? ''}
                imgSrc={tab.favIconUrl ?? ''}
            >
                {
                    makeTabsOptsList && <OptionBtnMenu optionsMenu={makeTabsOptsList} />
                }
            </ TabSmallView >
        </>
    );
};
