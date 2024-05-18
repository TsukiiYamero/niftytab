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
        maxTabsinMemory: 1,
        suspendAudibleTabs: false,
        suspendTabsAtStartup: false,
        excludeTabsFromList: false,
        keepTabsInMemory: true
    },
    temporarySettings: {
        excludeList: [],
        maxTabsinMemory: 1,
        suspendAudibleTabs: false,
        suspendTabsAtStartup: false,
        excludeTabsFromList: false,
        keepTabsInMemory: true
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
