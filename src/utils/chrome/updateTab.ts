
export const updateTab = (tab: chrome.tabs.Tab): void => {
    if (!tab.id) return;

    chrome?.tabs?.update(
        tab.id,
        {
            active: true
        });
};
