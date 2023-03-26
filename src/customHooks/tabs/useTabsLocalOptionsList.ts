import { useSnackbar } from '@/contexts/snackbar/hooks';
import { updateTab } from '@/utils/chrome/updateTab';
import { useCallback } from 'react';
import { OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { DeleteRounded, OpenInNew } from '@mui/icons-material';
import { removeTab } from '@/utils/chrome/removeTab';

export const useTabsLocalOptionsList = () => {
    const showSnackbar = useSnackbar();

    const openTab = useCallback(
        (tab: chrome.tabs.Tab) => {
            return () => {
                updateTab(tab);
                // console.log(tab);
            };
        }, []
    );

    const closeTab = useCallback(
        (tab: chrome.tabs.Tab) => {
            return () => {
                removeTab(tab);
                showSnackbar('Tab closed');
            };
        }, [showSnackbar]);

    const makeTabsOptsList = useCallback((tab: chrome.tabs.Tab): OptionBtnMenuList[] => {
        return [{
            onClick: openTab(tab), text: 'Open Tab', Icon: OpenInNew
        }, {
            onClick: closeTab(tab), text: 'Delete Tab', Icon: DeleteRounded
        }];
    }, [closeTab, openTab]);

    return makeTabsOptsList;
};
