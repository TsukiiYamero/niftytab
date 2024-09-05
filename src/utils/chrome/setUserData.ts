import type { UserData, UserDataStored } from '@/models/userSettings.types';

export const setUserData = async (data: UserDataStored) => {
    const dataToSave: UserData = {
        userData: data
    };

    try {
        await chrome.storage?.sync?.set(dataToSave);
    } catch (error) {
        console.error('Couldn\'t save user data [setUserData] ', error);
    }
};
