import { readDefaultGroup, readDefaultSession } from '@/services/tabs';

/**
 * This function reads the default group and session from the supabase and returns the default group
 * and session ids.
 * @returns an object with a property called defaults.
 */
export const handleDefaultsIds = async () => {
    const groupDefault = await readDefaultGroup();
    const sessionDefault = await readDefaultSession();

    if (groupDefault.error) {
        console.error(groupDefault.error?.message);
        return { error: groupDefault.error.message };
    }

    if (sessionDefault.error) {
        console.error(sessionDefault.error?.message);
        return { error: sessionDefault.error.message };
    }

    return {
        defaults: {
            groupId: groupDefault.data[0]?.id ?? 1,
            sessionId: sessionDefault.data[0]?.id ?? 1
        },
        error: null
    };
};
