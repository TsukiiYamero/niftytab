import { NiftyTab } from '@/models';
import { TabSmallView } from '@/ui/atoms/TabSmallView';
import { OptionBtnMenu, OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';

type Props = {
    tab: NiftyTab | chrome.tabs.Tab;
    makeTabsOptsList: OptionBtnMenuList[];
};

export const TabsListing = ({ tab, makeTabsOptsList }: Props) => {
    const validateFavicon = (faviconUrl: string | undefined) =>
        faviconUrl
            ? faviconUrl.includes('chrome-extension:') ? '' : faviconUrl
            : '';

    return (
        <>
            <TabSmallView
                title={tab.title ?? ''}
                urlText={tab.url ?? ''}
                imgSrc={validateFavicon(tab.favIconUrl)}
            >
                {
                    makeTabsOptsList && <OptionBtnMenu optionsMenu={makeTabsOptsList} />
                }
            </ TabSmallView >
        </>
    );
};
