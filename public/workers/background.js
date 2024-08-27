chrome.runtime.onInstalled.addListener(() => {
    console.log('Starting Suspension Tabs...');


});

const getDataFromLocal = async () => {
    try {
        const getDataFromLocal = await chrome.storage?.local?.get();
        if (!getDataFromLocal) {
            console.warn('Error getting data from local it seems does not exist');
            return;
        }

        return {
            userSettings: getDataFromLocal.userSettings || null,
            isSuspend: getDataFromLocal.isSuspend || false
        };

    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

const suspendTabs = () => {

}

/* const shouldSuspendTab = (tab): boolean => {
    return
} */