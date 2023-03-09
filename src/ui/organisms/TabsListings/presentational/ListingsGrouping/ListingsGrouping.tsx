import { SessionCloud } from '@/models';
import { ListingGrouping } from './ListingGrouping';
import { ListingsGrid } from '../ListingsGrid.styled';
import { OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { DataNotFound } from '@/ui/atoms/DataNotFound';

type Props = {
    sessions: SessionCloud[],
    sessionOptionsList: (session: SessionCloud) => OptionBtnMenuList[];
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
