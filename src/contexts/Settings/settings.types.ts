import type { UserSettings } from '@/models/userSettings.types';

export enum SettingsActions {
    updateSettings = 'update_settings',
    resetSettings = 'reset_settings',
    saveSettings = 'save_settings'
}

export type SettingsActionType =
    | { type: SettingsActions.updateSettings; payload: UserSettings }
    | { type: SettingsActions.resetSettings; payload: UserSettings }
