/* eslint-disable @typescript-eslint/no-unused-vars */
import { TabsActions } from '@/contexts/tabs';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { TabsCloud, NiftyTab } from '@/models';
import { filterTabsByTitleOrUrl } from '@/utils';
import { filterAllTabsInfo } from '@/utils/tabs/filterAllTabsInfo';
import { Box, FormHelperText } from '@mui/material';
import { useEffect, useState } from 'react';
import { DataNotFound } from '@/ui/atoms/DataNotFound';
import { CloudListings, TabsListings } from '../../TabsListings';
import { useAuthState } from '@/contexts/auth';
import { useTabsCloudOptionList } from '@/customHooks/tabs';
import { SimpleLoading } from '@/ui/atoms/Loadings';
import { DEFAULT_SESSION_NAME } from '@/services/tabs';

export const SearchResultTabs = () => {
    const { filterQuery, local, cloud, loading } = useGetTabsContext();
    const dispatch = useTabsDispatch();
    const makeTabsOptsList = useTabsCloudOptionList();
    const { user } = useAuthState();
    const [dataFiltered, setDataFiltered] = useState<{
        local: NiftyTab[],
        cloud: TabsCloud[],
        cloudUngrouped: TabsCloud[],
    }>({
        local: [],
        cloud: [],
        cloudUngrouped: []
    });

    useEffect(() => {
        // ni idea ~ nose por que entra vacio el filterQuery siempre
        if (filterQuery.trim().length === 0) return;

        dispatch({ type: TabsActions.requestTabs });

        const listLocalFiltered = filterTabsByTitleOrUrl(local, filterQuery);
        const listCloudFiltered = filterAllTabsInfo(cloud, filterQuery);

        // handling default group, if exist remove and create a new array for it
        const ungroupedIndex = listCloudFiltered.findIndex(sessionName => sessionName.name === DEFAULT_SESSION_NAME);
        let listCloudUngrouped: TabsCloud[] = [];
        if (ungroupedIndex > -1) {
            listCloudUngrouped = [listCloudFiltered[ungroupedIndex]];
            listCloudFiltered.splice(ungroupedIndex, 1);
        }

        setDataFiltered({ local: listLocalFiltered, cloud: listCloudFiltered, cloudUngrouped: listCloudUngrouped });
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
                                : <>
                                    <FormHelperText>Results in your tabs opened</FormHelperText>
                                    <TabsListings tabs={dataFiltered.local} />
                                </>
                        }

                        {
                            !user || dataFiltered.cloud.length === 0
                                ? null
                                : <>
                                    <FormHelperText>Results in Tabs Ungrouped</FormHelperText>

                                    <CloudListings cloudGroup={dataFiltered.cloudUngrouped} makeTabsOptsList={makeTabsOptsList} />
                                </>
                        }

                        {
                            !user || dataFiltered.cloud.length === 0
                                ? null
                                : <>
                                    <FormHelperText>Results in Sessions</FormHelperText>

                                    <CloudListings cloudGroup={dataFiltered.cloud} makeTabsOptsList={makeTabsOptsList} />
                                </>
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
