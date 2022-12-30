import { TabsNotFound } from '../TabsNotFound';
import { SessionNifty, SessionNiftyCount } from '@/models';
import { ListingGrouping } from './ListingGrouping';
import { ListingsGrid } from '../ListingsGrid.styled';
import { OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { SimpleLoading } from '@/ui/atoms/Loadings';

type Props = {
    sessions: SessionNiftyCount[],
    loading: boolean,
    sessionOptionsList: (session: SessionNifty) => OptionBtnMenuList[];
}

export const ListingsGrouping = ({ sessions, loading, sessionOptionsList }: Props) => {
    return (
        <>
            {
                loading
                    ? <SimpleLoading />
                    : sessions.length > 0
                        ? <ListingsGrid>
                            {sessions.map(session => (<ListingGrouping session={session} key={session.id} sessionOptionsList={sessionOptionsList} />))}
                        </ListingsGrid>
                        : <TabsNotFound />
            }
        </>
    );
};
