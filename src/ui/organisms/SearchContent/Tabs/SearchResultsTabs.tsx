/* eslint-disable @typescript-eslint/no-unused-vars */
import { TabsActions } from '@/contexts/tabs';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { TabsCloud, NiftyTab } from '@/models';
import { filterTabsByTitleOrUrl } from '@/utils';
import { filterAllTabsInfo } from '@/utils/tabs/filterAllTabsInfo';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataNotFound } from '@/ui/atoms/DataNotFound';
import { CloudListings, TabsListings } from '../../TabsListings';
import { useAuthState } from '@/contexts/auth';
import { useTabsCloudOptionList } from '@/customHooks/tabs';
import { SimpleLoading } from '@/ui/atoms/Loadings';

export const SearchResultTabs = () => {
    const { filterQuery, local, cloud, loading } = useGetTabsContext();
    const dispatch = useTabsDispatch();
    const makeTabsOptsList = useTabsCloudOptionList();
    const { user } = useAuthState();
    const [dataFiltered, setDataFiltered] = useState<{
        local: NiftyTab[],
        cloud: TabsCloud[]
    }>({
        local: [],
        cloud: []
    });

    useEffect(() => {
        // ni idea ~ nose por que entra vacio el filterQuery siempre
        if (filterQuery.length === 0) return;

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
                loading
                    ? <SimpleLoading />
                    : <>
                        {
                            dataFiltered.local.length === 0
                                ? null
                                : <TabsListings tabs={dataFiltered.local} />
                        }

                        {
                            !user || dataFiltered.cloud.length === 0
                                ? null
                                : <CloudListings cloudGroup={dataFiltered.cloud} makeTabsOptsList={makeTabsOptsList} />
                        }

                        {
                            (!user || dataFiltered.cloud.length === 0) && dataFiltered.local.length === 0
                                ? <DataNotFound />
                                : null
                        }
                    </>
            }

        </Box >
    );
};
