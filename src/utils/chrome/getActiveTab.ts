/**
 * Get the active tab in the current window.
 * @returns Tab `chrome.tabs.Tab`
 */
export const getActiveTab = async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    return tab;
};
