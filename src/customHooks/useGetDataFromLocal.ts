/* eslint-disable react-hooks/exhaustive-deps */
import type { UserDataStored } from '@/models/userSettings.types';
import { useEffect, useState } from 'react';
/*  
userSettings?: UserSettings,
isSuspend?: boolean,
Mejorar el prop
    */
export const useGetDataFromLocal = () => {
    const [data, setData] = useState<UserDataStored>({
        isSuspend: false,
        userSettings: {}
    });

    useEffect(() => {
        getDataFromLocal();
    }, []);

    const getDataFromLocal = async () => {
        try {
            const getDataFromLocal: UserDataStored | undefined = await chrome.storage?.local?.get();
            if (getDataFromLocal) {
                setData(getDataFromLocal);
            }
        } catch (error) {

        }
    };

    return {
        getDataFromLocal,
        data
    };
};
