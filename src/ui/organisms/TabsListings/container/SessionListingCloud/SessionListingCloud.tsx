import { ListingsGrouping } from '../../presentational/ListingsGrouping';
import { SimpleLoading } from '@/ui/atoms/Loadings';
import { AuthenticatedContent } from '@/ui/atoms/AuthenticatedContent';
import { useGetSessionsCloud, useSessionOptions } from '@/customHooks/sessions';

/**
 * Stateful comp to get the session list and group
 */
export const SessionListingCloud = () => {
    const { sessions, loading } = useGetSessionsCloud();
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
