import { useEffect, useState } from 'react';

export const useGetChromeSession = () => {
    const [tabActive, setTabActive] = useState('');

    useEffect(() => {
        const getActiveSession = () => {
            chrome.sessions.getDevices({}, (devices) => console.log(devices));

            setTabActive('a');
        };

        getActiveSession();
    }, []);

    return tabActive;
};
