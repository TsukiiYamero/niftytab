import type { UserSettings } from '@/models/userSettings.types';
import { createContext, type Dispatch } from 'react';
import type { SettingsActionType } from './settings.types';

interface SettingsContextType {
    openSettings: () => void,
    isOpen: boolean,
    settings: UserSettings
    temporarySettings: UserSettings
}

export const SettingsContext = createContext<SettingsContextType>({
    openSettings: () => { },
    isOpen: false,
    settings: {
        excludeList: [],
        maxTabsinMemory: 3,
        suspendTabsAfter: 3,
        neverSuspendAudibleTabs: false,
        suspendTabsAtStartup: false,
        excludeTabsFromList: false
    },
    temporarySettings: {
        excludeList: [],
        maxTabsinMemory: 3,
        suspendTabsAfter: 3,
        neverSuspendAudibleTabs: false,
        suspendTabsAtStartup: false,
        excludeTabsFromList: false
    }
});

export const SettingsDispatchContext =
    createContext<{
        settingsDispatch: Dispatch<SettingsActionType>,
        temporarySettingsDispatch: Dispatch<SettingsActionType>
    }>({
        settingsDispatch: () => { },
        temporarySettingsDispatch: () => { }
    });
