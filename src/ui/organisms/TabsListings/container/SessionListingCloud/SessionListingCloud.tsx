import { ListingsGrouping } from '../../presentational/ListingsGrouping';
import { SimpleLoading } from '@/ui/atoms/Loadings';
import { useGetTabsContext } from '@/contexts/tabs/hooks';
import { AuthenticatedContent } from '@/ui/atoms/AuthenticatedContent';
import { useGetSessionsCloud, useSessionOptions } from '@/customHooks/sessions';
import { useSetSessionsCloud } from '@/customHooks/sessions/useSetSessionsCloud';

/**
 * Stateful comp to get the session list and group
 */
export const SessionListingCloud = () => {
    const { sessionsCloud } = useGetSessionsCloud();
    useSetSessionsCloud(sessionsCloud);
    const { sessions, loading } = useGetTabsContext();
    const sessionOptions = useSessionOptions();

    return (
        <AuthenticatedContent>
            {
                loading
                    ? <SimpleLoading />
                    : <ListingsGrouping sessions={sessions} sessionOptionsList={sessionOptions} />
            }
        </AuthenticatedContent>
    );
};
