import { SessionNifty, SessionNiftyCount, NiftyTab } from '@/models';

type uniqueSession = {
    id: number;
    count: number;
}

export const getBadgeCount = (data: NiftyTab[]) => {
    const countObj: any = {};

    data.forEach((session: NiftyTab) => {
        if (countObj[session.sessionId]) {
            countObj[session.sessionId]++;
        } else {
            countObj[session.sessionId] = 1;
        }
    });
    const uniqueSessions: uniqueSession[] = [];

    Object.entries(countObj).forEach(([id, count]: any) => {
        uniqueSessions.push({ id, count });
    });

    return uniqueSessions;
};

/**
 * To show the number of tabs in the session
 */
export const makeListSessionWithBadgeCount = (dataSessions: SessionNifty[] = [], listOfCount: uniqueSession[] = []): SessionNiftyCount[] => {
    return dataSessions.map((session: SessionNifty) => {
        const sameSessionItem = listOfCount.find(sessionCount => Number(sessionCount.id) === session.id);

        return {
            ...session,
            badgeContent: sameSessionItem?.count ?? 0
        };
    });
};
