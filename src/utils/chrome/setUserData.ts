import type { UserDataStored } from '@/models/userSettings.types';
import { getUserDataFromSync } from './getUserData';

export const setUserData = async (data: UserDataStored) => {
    try {
        const PreviusDataStored = await getUserDataFromSync();
        const userData = {
            ...(PreviusDataStored ?? {}),
            ...data
        };

        await chrome.storage?.sync?.set({
            userData
        });
    } catch (error) {
        console.error('Couldn\'t save user data [setUserData] ', error);
    }
};
