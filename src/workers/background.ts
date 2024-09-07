import type { UserSettings } from '@/models/userSettings.types';
import { initialUserSettings } from '@/utils';
import { getUserDataFromSync } from '@/utils/chrome/getUserData';
import { autoSuspendTabs } from '@/utils/tabs/autoSuspendTabs';
import logo from '@/assets/img/logo/icon-64.png';

let intervalID: NodeJS.Timeout | null = null;

// On install start the tab suspension
chrome.runtime.onInstalled.addListener(async () => {
    console.log('OnInstalled bg worker');

    main();
});

// Se ejecuta cuando se actualizan las configuraciones del usuario en el almacenamiento
chrome.storage.onChanged.addListener(async () => {
    console.log('UserConfig updated restarting bg worker');

    main();
});

// On startup browser
chrome.runtime.onStartup.addListener(() => {
    // Cargar configuraciones y comenzar el ciclo de suspensión al abrir el navegador
    console.log('OnStartup bg worker');

    main(true);
});

// Revisa y Carga las configuraciones para comenzar el ciclo de suspensión
const main = async (isStartup = false) => {
    const data = await getUserDataFromSync();

    if (!data) {
        console.log('No user data found in sync storage');
        return;
    }

    const { isSuspend, userSettings } = data;

    // verifica si es necesario suspender o no
    if (stopSuspension(isSuspend, userSettings, isStartup)) {
        return;
    }

    const suspendTabsHandler = async () => {
        const newNOfSuspendedTabs = await autoSuspendTabs(
            userSettings?.recentTabsLimit ?? initialUserSettings.recentTabsLimit!,
            userSettings?.neverSuspendAudibleTabs ?? initialUserSettings.neverSuspendAudibleTabs!,
            userSettings?.excludeList ?? initialUserSettings.excludeList!
        );

        console.info('[Number of Tabs Suspended] ', newNOfSuspendedTabs);

        if (newNOfSuspendedTabs > 0 && userSettings?.suspendNotification)
            showNotification(newNOfSuspendedTabs);
    };

    startSuspension(userSettings?.suspendTabsAfter, suspendTabsHandler);
};

const startSuspension = (intervalInMns: number = 3, fn: () => void) => {
    const intervalTime = intervalInMns * 60 * 1000;

    stopInterval();

    intervalID = setInterval(() => {
        fn();
    }, intervalTime);
};

const stopInterval = () => {
    if (intervalID !== null) {
        clearInterval(intervalID);
        intervalID = null;
        return;
    }

    console.info('No interval to stop');
};

/**
 * Detiene la suspension de tabs si no esta marcado la configuración de suspensión o si la configuración es falsao no existe
 * @param isSuspend 
 * @param userSettings 
 * @returns boolean si se detiene la suspensión o no
 */
const stopSuspension = (isSuspend: boolean | undefined, userSettings: UserSettings | undefined, isStartup = false) => {
    // si es falso dejar de suspender
    if (!isSuspend) {
        stopInterval();
        return true;
    }
    // si se abrio el navegador y la configuracion de suspender al inicio es falsa, no suspender
    if (!userSettings?.suspendTabsAtStartup && isStartup) {
        stopInterval();
        return true;
    }

    return false;
};

const showNotification = (numTabsSuspended: number) => {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: logo,
        title: 'Tabs Suspended',
        message: `${numTabsSuspended} tabs were suspended.`
    });
};
