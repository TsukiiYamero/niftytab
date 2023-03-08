import { TabsActions } from '@/contexts/tabs';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { AllTabsInfo, NiftyTab } from '@/models';
import { filterTabsByTitleOrUrl } from '@/utils';
import { filterAllTabsInfo } from '@/utils/tabs/filterAllTabsInfo';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataNotFound } from '@/ui/atoms/DataNotFound';
import { CloudListings, TabsListings } from '../../TabsListings';
import { useAuthState } from '@/contexts/auth';
import { useTabsCloudOptionList } from '@/customHooks/tabs';

export const TabsFiltered = () => {
    const { filterQuery, local, cloud, loading } = useGetTabsContext();
    const dispatch = useTabsDispatch();
    const makeTabsOptsList = useTabsCloudOptionList();
    const { user } = useAuthState();
    const [dataFiltered, setDataFiltered] = useState<{
        local: NiftyTab[],
        cloud: AllTabsInfo[]
    }>({
        local: [],
        cloud: []
    });

    useEffect(() => {
        dispatch({ type: TabsActions.requestTabs });

        const listLocalFiltered = filterTabsByTitleOrUrl(local, filterQuery);
        const listCloudFiltered = filterAllTabsInfo(cloud, filterQuery);

        setDataFiltered({ local: listLocalFiltered, cloud: listCloudFiltered });
        dispatch({ type: TabsActions.finishRequestTabs });
    }, [cloud, dispatch, filterQuery, local]);

    return (
        <Box>

            {/* NO estoy seguro si deberia hacer esta parte de esta forma jumm
                Basicamente es para que cada parte no muetre el astrounata de not found
            */}

            {
                dataFiltered.local.length === 0
                    ? null
                    : <TabsListings loading={loading} tabs={dataFiltered.local} />
            }

            {
                !user || dataFiltered.cloud.length === 0
                    ? null
                    : <CloudListings cloudGroup={dataFiltered.cloud} loading={loading} makeTabsOptsList={makeTabsOptsList} />
            }

            {
                (!user || dataFiltered.cloud.length === 0) && dataFiltered.local.length === 0
                    ? <DataNotFound />
                    : null
            }

        </Box >
    );
};
