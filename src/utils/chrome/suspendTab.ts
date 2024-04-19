export const suspendTab = async (tabId: number) => {
    const tab = await chrome.tabs.discard(tabId);
    return tab;
};
