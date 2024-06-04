import { SettingsContext, SettingsDispatchContext } from '@/contexts/Settings';
import { SettingsActions } from '@/contexts/Settings/settings.types';
import { useContext } from 'react';
import { ModalSettingsView } from './ModalSettingsView';

export const ModalSettingsContainer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const { settingsDispatch, temporarySettingsDispatch } = useContext(SettingsDispatchContext);
    const {
        settings, temporarySettings
    } = useContext(SettingsContext);

    const handleSave = () => {
        settingsDispatch({ type: SettingsActions.updateSettings, payload: temporarySettings });
        onClose();
    };

    const handleCancel = () => {
        temporarySettingsDispatch({ type: SettingsActions.resetSettings, payload: settings });
        onClose();
    };

    return (
        <ModalSettingsView
            isOpen={isOpen}
            onClose={onClose}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    );
};
