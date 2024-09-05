import type { UserDataStored } from '@/models/userSettings.types';
import { setUserData } from '@/utils/chrome/setUserData';

export const useSetDataInSync = () => {
    const setDataForSync = async (data: UserDataStored) => {
        try {
            await setUserData(data);
        } catch (error) {
            console.error(error);
        }
    };

    return {
        setDataForSync
    };
};
