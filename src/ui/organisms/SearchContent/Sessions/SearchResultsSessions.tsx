import { TabsActions } from '@/contexts/tabs';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { SessionCloud } from '@/models';
import { AuthenticatedContent } from '@/ui/atoms/AuthenticatedContent';
import { SimpleLoading } from '@/ui/atoms/Loadings';
import { filterSession } from '@/utils';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { ListingsGrouping } from '../../TabsListings';
import { useSessionOptions } from '@/customHooks/sessions';

export const SearchResultsSessions = () => {
    const { filterQuery, sessions, loading } = useGetTabsContext();
    const dispatch = useTabsDispatch();
    const makeSessionsOptsList = useSessionOptions();
    const [dataFiltered, setDataFiltered] = useState<SessionCloud[]>([]);

    useEffect(() => {
        // ni idea ~ nose por que entra vacio el filterQuery siempre
        if (filterQuery.trim().length === 0) return;

        dispatch({ type: TabsActions.requestTabs });

        const sessionsFiltered = filterSession(sessions, filterQuery);

        setDataFiltered(sessionsFiltered);

        dispatch({ type: TabsActions.finishRequestTabs });
    }, [dispatch, filterQuery, sessions]);

    return (
        <Box sx={{ overflow: 'auto' }}>
            <AuthenticatedContent>
                {
                    loading
                        ? <SimpleLoading />
                        : <ListingsGrouping sessions={dataFiltered} sessionOptionsList={makeSessionsOptsList} />
                }
            </AuthenticatedContent>
        </Box >
    );
};
