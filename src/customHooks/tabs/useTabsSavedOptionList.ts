import { NiftyTab } from '@/models';
import { OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { useCallback } from 'react';
import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { deleteTabs } from '@/services/tabs/tab/deleteTabs';
import { useTabsDispatch } from '@/contexts/tabs/hooks';
import { TabsActions } from '@/contexts/tabs';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useSnackbar } from '@/contexts/snackbar/hooks';
import { createChromeTab } from '@/utils/chrome/openTabs';

/**
 * List of several options for cloud tabs
 */
export const useTabsCloudOptionList = () => {
    const { callApi } = useFetchWithCallback();
    const dispatch = useTabsDispatch();
    const showSnackbar = useSnackbar();

    const openTab = useCallback(
        (tab: NiftyTab) => {
            return () => {
                createChromeTab(tab.url);
                // console.log(tab);
            };
        }, []
    );

    const deleteTab = useCallback(
        (tab: NiftyTab) => {
            return async () => {
                dispatch({ type: TabsActions.requestTabs });

                const { error } = await callApi(deleteTabs, tab.refererId);

                if (error) {
                    showSnackbar(
                        'Ops... the tab could not be deleted, please try again later.',
                        'error');
                    return;
                }

                dispatch({ type: TabsActions.deleteTabInCloud, payload: tab.url });
                showSnackbar('Tab Deleted', 'success');
            };
        }, [callApi, dispatch, showSnackbar]
    );

    const makeTabsOptsList = useCallback((tab: NiftyTab): OptionBtnMenuList[] => {
        return [{
            onClick: openTab(tab), text: 'Open Tab', Icon: OpenInNewIcon
        }, {
            onClick: deleteTab(tab), text: 'Delete Tab', Icon: DeleteRoundedIcon
        }];
    }, [deleteTab, openTab]);

    return makeTabsOptsList;
};

/* fmt.Sprintf("%[1]d texto algo %[5]d", 4, 5, 6) */
