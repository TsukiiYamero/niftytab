
export const removeTab = (tab: chrome.tabs.Tab) => {
    if (!tab.id) return;

    chrome.tabs.remove(
        [tab.id]
    );
};
