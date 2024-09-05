import type { UserDataStored } from '@/models/userSettings.types';

export const getUserDataFromSync = async (): Promise<UserDataStored | undefined> => {
    try {
        const { userData } = await chrome.storage?.sync?.get() as { userData?: UserDataStored };

        return userData;
    } catch (error) {
        console.error('Couldn\'t get user data [getUserDataFromLocal] ', error);
    }
};

/* 
YA PUDEEE
https://ajaynjain.medium.com/how-i-built-a-chrome-extension-with-react-and-vite-without-crxjs-plugin-b607194c4f5e

ccrear varios archivos para compilar y anidarlos
ahora lo que sigue es hacer el get user data bien validado

*/
