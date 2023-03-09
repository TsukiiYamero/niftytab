import { SessionCloud } from '@/models';
import { SessionItem } from '@/ui/atoms/SessionItem';
import { OptionBtnMenu, OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { useMemo } from 'react';

type Props = {
    session: SessionCloud;
    sessionOptionsList: (session: SessionCloud) => OptionBtnMenuList[];
}

export const ListingGrouping = ({ session, sessionOptionsList }: Props) => {
    const optionsList = useMemo(() => sessionOptionsList(session), [sessionOptionsList, session]);

    return (
        <SessionItem
            title={session.name}
            badgeContent={session.countBadge}
        >
            {
                sessionOptionsList.length > 0
                    ? <OptionBtnMenu optionsMenu={optionsList} />
                    : null
            }
        </SessionItem>
    );
};
