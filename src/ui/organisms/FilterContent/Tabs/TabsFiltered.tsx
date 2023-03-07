import { TabsActions } from '@/contexts/tabs';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { AllTabsInfo, NiftyTab } from '@/models';
import { filterTabsByTitleOrUrl } from '@/utils';
import { filterAllTabsInfo } from '@/utils/tabs/filterAllTabsInfo';
import { MemoizedTabsListingsLocal, MemoizedTabsListingsCloud } from '@/ui/organisms/TabsListings/container';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

export const TabsFiltered = () => {
    const { filterQuery, local, cloud, loading } = useGetTabsContext();
    const [dataFiltered, setDataFiltered] = useState<{
        local: NiftyTab[],
        cloud: AllTabsInfo[]
    }>();

    const dispatch = useTabsDispatch();

    useEffect(() => {
        dispatch({ type: TabsActions.requestTabs });

        const listLocalFiltered = filterTabsByTitleOrUrl(local, filterQuery);
        const listCloudFiltered = filterAllTabsInfo(cloud, filterQuery);

        setDataFiltered({ local: listLocalFiltered, cloud: listCloudFiltered });
        dispatch({ type: TabsActions.finishRequestTabs });
    }, [cloud, dispatch, filterQuery, local]);

    return (
        <Box>
            <MemoizedTabsListingsLocal
                local={dataFiltered?.local ?? []}
                loading={loading}
                dispatch={dispatch} />

            <MemoizedTabsListingsCloud
                cloud={dataFiltered?.cloud ?? []}
                loading={loading}
                dispatch={dispatch} />
        </Box>
    );
};
