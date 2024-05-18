import type { UserSettings } from '@/models/userSettings.types';
import { createContext, type Dispatch } from 'react';
import type { SettingsActionType } from './settings.types';

interface SettingsContextType {
    openSettings: () => void,
    isOpen: boolean,
    settings: UserSettings
}

export const SettingsContext = createContext<SettingsContextType>({
    openSettings: () => { },
    isOpen: false,
    settings: {
        excludeList: [],
        maxTabsinMemory: 1,
        suspendAudibleTabs: false,
        suspendTabsAtStartup: false
    }
});

export const SettingsDispatchContext =
    createContext<Dispatch<SettingsActionType> | null>(null);
