import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { ReadSessions, readTabs } from '@/services/tabs';
import { useEffect } from 'react';
import { ListingsGrouping } from '../../presentational/ListingsGrouping';
import { SessionNiftyCount } from '@/models';
import { getBadgeCount, makeListSessionWithBadgeCount, makeSessionNifty as supabaseSessionToNiftySession } from '@/utils/sessions';
import { useSessionOptions } from '@/customHooks/sessions';
import { SimpleLoading } from '@/ui/atoms/Loadings';
import { TabsListingsNotUser } from '../TabsListingsNotUser';
import { useAuthState } from '@/contexts/auth';
import { SESSION_DEFAULT } from '@/utils';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { TabsActions } from '@/contexts/tabs';
import { supabaseTabsToNiftyTabs } from '@/utils/tabs';

/**
 * Stateful comp to get the session list and group
 */
export const SectionGroupings = () => {
    const { callApi } = useFetchWithCallback();
    const { callApi: fetchGetTabs } = useFetchWithCallback();
    const { user } = useAuthState();
    const { sessions, loading, isFiltering, filtered } = useGetTabsContext();
    const dispatch = useTabsDispatch();
    const sessionOptions = useSessionOptions();

    useEffect(() => {
        /**
         * Fetch tabs and sessions
         * tabs because we need to know the number of tabs to display a badge
         */
        const getSessions = async () => {
            dispatch({ type: TabsActions.requestTabs });

            const respAll = await Promise.all([fetchGetTabs(readTabs), callApi(ReadSessions)]);

            const { data: dataTabs, error: errorTabs } = respAll[0];
            const { data: dataSessions, error: errorSessions } = respAll[1];

            if (!errorTabs && !errorSessions) {
                const niftyTabs = supabaseTabsToNiftyTabs(dataTabs);
                const listOfCount = getBadgeCount(niftyTabs);
                const listNiftySessions = supabaseSessionToNiftySession(dataSessions);
                const listSessionsWithCount = makeListSessionWithBadgeCount(listNiftySessions, listOfCount);
                // default session item should to be removed because it can not appear
                const listSessionWithoutDefault = listSessionsWithCount.filter(session => session.browserName !== SESSION_DEFAULT);
                dispatch({ type: TabsActions.updatedSessions, payload: listSessionWithoutDefault });
                console.log(listSessionWithoutDefault, errorSessions);
            }

            dispatch({ type: TabsActions.finishRequestTabs });
        };

        user && getSessions();
    }, [user, fetchGetTabs, callApi, dispatch]);

    const tabsToShow = isFiltering ? (filtered as SessionNiftyCount[]) : sessions;

    return (
        <>
            {
                loading
                    ? <SimpleLoading />
                    : user
                        ? <ListingsGrouping loading={loading} sessions={tabsToShow} sessionOptionsList={sessionOptions} />
                        : <TabsListingsNotUser />
            }
        </>
    );
};
