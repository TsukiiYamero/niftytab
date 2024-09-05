import { type UserDataStored } from '@/models/userSettings.types';

export const getUserDataFromLocal = async (): Promise<UserDataStored | undefined> => {
    try {
        const getDataFromLocal: Record<string, UserDataStored> = await chrome.storage?.local?.get();
        console.log(getDataFromLocal);
        if (getDataFromLocal && Object.keys(getDataFromLocal).length > 0) {
            return undefined;
        }

        return undefined;
    } catch (error) {

    }
};

/* 
YA PUDEEE
https://ajaynjain.medium.com/how-i-built-a-chrome-extension-with-react-and-vite-without-crxjs-plugin-b607194c4f5e

ccrear varios archivos para compilar y anidarlos
ahora lo que sigue es hacer el get user data bien validado

*/
