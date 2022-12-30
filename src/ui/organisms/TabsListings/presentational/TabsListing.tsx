import { NiftyTab } from '@/models';
import { useCallbackRef } from '@/customHooks/useCallbackRef';
import { TabSmallView } from '@/ui/atoms/TabSmallView';
import { OptionBtnMenu, OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { useEffect, useState } from 'react';

type Props = {
    tab: NiftyTab;
    makeTabsOptsList?: (tab: NiftyTab) => OptionBtnMenuList[];
};

export const TabsListing = ({ tab, makeTabsOptsList }: Props) => {
    const [optionsMenuList, setOptionsMenuList] = useState<OptionBtnMenuList[]>([]);

    const makeOptsListRef = useCallbackRef(makeTabsOptsList);
    const tabRef = useCallbackRef(tab);

    useEffect(() => {
        if (makeOptsListRef.current) {
            setOptionsMenuList(makeOptsListRef.current?.(tabRef.current));
        }
    }, [setOptionsMenuList, makeOptsListRef, tabRef]);

    return (
        <>
            <TabSmallView
                title={tab.title ?? ''}
                urlText={tab.url ?? ''}
                imgSrc={tab.favIconUrl ?? ''}
            >
                {
                    makeTabsOptsList && <OptionBtnMenu optionsMenu={optionsMenuList} />
                }
            </ TabSmallView >
        </>
    );
};
