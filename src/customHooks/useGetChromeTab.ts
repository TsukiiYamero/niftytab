import { useEffect, useState } from 'react';

export const useGetChromeTab = () => {
    const [tabActive, setTabActive] = useState<chrome.tabs.Tab>(null!);

    useEffect(() => {
        const getActiveTab = async () => {
            const [tab] = await chrome.tabs.query({
                active: true,
                currentWindow: true
            });

            tab && setTabActive(tab);
        };

        getActiveTab();
    }, []);

    return tabActive;
};
