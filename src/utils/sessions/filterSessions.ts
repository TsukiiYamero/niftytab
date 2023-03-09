import { SessionCloud } from '@/models';

export const filterSession = (list: SessionCloud[], keyword: string) => {
    return list.filter(session =>
        session.name.toLowerCase().includes(keyword.toLowerCase())
    );
};
