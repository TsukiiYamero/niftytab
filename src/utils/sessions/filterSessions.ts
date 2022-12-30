import { SessionNiftyCount } from '@/models';

export const filterSession = (list: SessionNiftyCount[], keyword: string) => {
    return list.filter(session =>
        session.browserName.toLowerCase().includes(keyword.toLowerCase())
    );
};
