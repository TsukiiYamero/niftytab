import type { UserSettings } from '@/models/userSettings.types';
import { SettingsActions, type SettingsActionType } from '../settings.types';

export const settingsReducer = (
    state: UserSettings,
    action: SettingsActionType
) => {
    switch (action.type) {
        case SettingsActions.updateSettings:
            return {
                ...state,
                ...action.payload
            };
        default:
            throw new Error('Unhandled Settings action type');
    }
};
