import type { UserDataStored } from '@/models/userSettings.types';
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
            try {
                const getDataFromLocal: UserDataStored | undefined = await chrome.storage?.local?.get();
                if (getDataFromLocal) {
                    setData(getDataFromLocal);
                }
            } catch (error) {

            }
        };

        getDataFromLocal();
    }, []);

    return {
        data
    };
};
