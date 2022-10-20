export const getAllTabs = async () => {
    const tabs = await chrome.tabs.query({
        currentWindow: true
    });

    return tabs;
};
