import type { UserDataStored } from '@/models/userSettings.types';
import { getUserDataFromSync } from '@/utils/chrome/getUserData';
import { useEffect, useState } from 'react';

/**
 * Get the user data stored from chrome session
 * @returns 
 */
export const useGetUserDataFromLocal = () => {
    const [data, setData] = useState<UserDataStored>({
        isSuspend: false,
        userSettings: {}
    });

    useEffect(() => {
        // usar getUserDataFromLocal from getUserData ts
        const getDataFromLocal = async () => {
            const getDataFromLocal = await getUserDataFromSync();

            if (!getDataFromLocal) return;

            setData((previusData) => {
                return {
                    ...previusData,
                    ...getDataFromLocal
                };
            });
        };

        getDataFromLocal();
    }, []);

    return {
        data
    };
};
