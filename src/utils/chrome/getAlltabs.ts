export const getAllChromeTabs = async () => {
    const tabs = await chrome.tabs?.query({
        currentWindow: true
    });

    return tabs ?? [];
};
