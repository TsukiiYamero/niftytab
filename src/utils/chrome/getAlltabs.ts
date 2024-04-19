/**
 * Get all the tabs in the current window.
 * @returns An array of tabs.
 */
export const getAllBrowserTabs = async () => {
    const tabs = await chrome.tabs?.query({
        currentWindow: true
    });

    return tabs ?? [];
};
