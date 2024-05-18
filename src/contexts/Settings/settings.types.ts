import type { UserSettings } from '@/models/userSettings.types';

export enum SettingsActions {
    updateSettings = 'update_settings'
}

export type SettingsActionType =
    | { type: SettingsActions.updateSettings; payload: UserSettings };
