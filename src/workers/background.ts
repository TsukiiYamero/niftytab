import { getUserDataFromSync } from '@/utils/chrome/getUserData';

// On install start the tab suspension
// this case is not necesary
chrome.runtime.onInstalled.addListener(async () => {
    console.log('OnInstalled bg worker');
});

// On Change user settings in extension
chrome.storage.onChanged.addListener(async () => {
    console.log('UserConfig updated restarting bg worker');

    startSuspension();
});

// On startup browser
chrome.runtime.onStartup.addListener(() => {
    // Cargar configuraciones y comenzar el ciclo de suspensión al abrir el navegador
    console.log('OnStartup bg worker');

    startSuspension();
});

const startSuspension = async () => {
    const data = await getUserDataFromSync();

    if (!data) {
        console.log('No user data found in sync storage');
        return;
    }

    console.log(data);
};
