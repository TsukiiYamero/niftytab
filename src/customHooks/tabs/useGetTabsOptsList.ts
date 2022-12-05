import { NiftyTab } from '@/models';
import { OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { useCallback } from 'react';
import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { deleteTabs } from '@/services/tabs/tab/deleteTabs';
import { useGetTabsDispatchContext } from '@/contexts/tabs/hooks';
import { TabsActions } from '@/contexts/tabs';

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export const useGetTabsOptsList = () => {
    const { callApi } = useFetchWithCallback();
    const dispatch = useGetTabsDispatchContext();

    const openTab = useCallback(
        (tab: NiftyTab) => {
            return () => {
                console.log(tab);
            };
        }, []
    );

    const deleteTab = useCallback(
        (tab: NiftyTab) => {
            return async () => {
                dispatch({ type: TabsActions.requestTabs });
                console.log(tab.url);
                const resp = await callApi(deleteTabs, tab.url);
                console.log(resp);
                dispatch({ type: TabsActions.deleteTabInSaved, payload: tab.url });
            };
        }, [callApi, dispatch]
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
