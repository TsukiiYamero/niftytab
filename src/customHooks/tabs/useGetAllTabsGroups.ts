import { useFetchWithCallback } from '@/customHooks/useFetchWithCallback';
import { readGroups } from '@/services/tabs';

/**
 * This function is used to get all the tab groups from the database.
 * @returns An object with a function to get All TabGroups.
 */
export const useGetAllTabGroups = () => {
    const { callApi } = useFetchWithCallback();

    const getAllTabGroups = async () => {
        const allGroups = await callApi(readGroups);

        if (allGroups.error) return [];

        return allGroups.data ?? [];
    };

    return { getAllTabGroups };
};
