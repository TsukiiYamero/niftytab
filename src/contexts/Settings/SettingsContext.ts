import { createContext } from 'react';

type SettingsContextType = {
    openSettings: () => void,
    isOpen: boolean
}

export const SettingsContext = createContext<SettingsContextType>({
    openSettings: () => { },
    isOpen: false
});
