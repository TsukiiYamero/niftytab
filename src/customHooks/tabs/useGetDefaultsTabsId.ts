import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { readDefaultGroup, readDefaultSession } from '@/services/tabs';
import { useCallback } from 'react';

/**
 * This function reads the defaults Id of group and session from the supabase
 */
export const useGetDefaultUserIds = () => {
    const { callApi } = useFetchWithCallback();
    const { callApi: callSecondApi } = useFetchWithCallback();

    /**
     * Get the default group and session ids of the user,
     * Generally is used to assign it to the tabs for save them
     * if got an error show the snackbar
     */
    const getDefaultUserIds = useCallback(async () => {
        const RespDefault = await Promise.all([callApi(readDefaultGroup), callSecondApi(readDefaultSession)]);
        const groupDefault = RespDefault[0];
        const sessionDefault = RespDefault[1];

        if (groupDefault.error) {
            console.error(groupDefault.error?.message);
            return { error: groupDefault.error.message };
        }

        if (sessionDefault.error) {
            console.error(sessionDefault.error?.message);
            return { error: sessionDefault.error.message };
        }

        return {
            defaultsIds: {
                groupId: groupDefault.data[0]?.id ?? 1,
                sessionId: sessionDefault.data[0]?.id ?? 1
            },
            error: ''
        };
    }, [callApi, callSecondApi]);

    return {
        getDefaultUserIds
    };
};
