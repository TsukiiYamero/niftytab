import { SessionNifty, SessionNiftyCount } from '@/models';
import { ListingGrouping } from './ListingGrouping';
import { ListingsGrid } from '../ListingsGrid.styled';
import { OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { DataNotFound } from '@/ui/atoms/DataNotFound';

type Props = {
    sessions: SessionNiftyCount[],
    sessionOptionsList: (session: SessionNifty) => OptionBtnMenuList[];
}

export const ListingsGrouping = ({ sessions, sessionOptionsList }: Props) => {
    return (
        <>
            {
                sessions.length > 0
                    ? <ListingsGrid>
                        {sessions.map(session => (<ListingGrouping session={session} key={session.id} sessionOptionsList={sessionOptionsList} />))}
                    </ListingsGrid>
                    : <DataNotFound />
            }
        </>
    );
};
