
/**
 * It opens a new tab with the url passed
 * @param {string} url - The URL to open in the new tab.
 * @param {string} callbackFunc - callbackFunc that executes when the tab has been opened
 */
export const openTabs = (url: string, callbackFunc?: (tab: chrome.tabs.Tab) => any) => {
    chrome?.tabs?.create({
        url
    }, (tab) => { callbackFunc?.(tab); console.log(tab); });
};
