import type { UserDataStored } from '@/models/userSettings.types';

export const useSetDataForLocal = () => {
    const setDataForLocal = async (data: UserDataStored) => {
        try {
            await chrome.storage?.local?.set(data);
        } catch (error) {
            console.error(error);
        }
    };

    return {
        setDataForLocal
    };
};
