/**
 * It opens a new tab with the url passed
 * @param {string} url - The URL to open in the new tab.
 */
export const createBrowserTab = async (url: string): Promise<chrome.tabs.Tab> => {
    const tabCreated = await chrome?.tabs?.create({ url });
    return tabCreated;
};
