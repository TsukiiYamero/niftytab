/* eslint-disable @typescript-eslint/no-unused-vars */
import { SessionNifty, SessionNiftyCount } from '@/models';
import { SessionItem } from '@/ui/atoms/SessionItem';
import { OptionBtnMenu, OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { useMemo } from 'react';

type Props = {
    session: SessionNiftyCount;
    sessionOptionsList: (session: SessionNifty) => OptionBtnMenuList[];
}

export const ListingGrouping = ({ session, sessionOptionsList }: Props) => {
    const optionsList = useMemo(() => sessionOptionsList(session), [sessionOptionsList, session]);

    return (
        <SessionItem
            title={session.browserName}
            badgeContent={session.badgeContent}
        >
            {
                sessionOptionsList.length > 0
                    ? <OptionBtnMenu optionsMenu={optionsList} />
                    : null
            }
        </SessionItem>
    );
};
