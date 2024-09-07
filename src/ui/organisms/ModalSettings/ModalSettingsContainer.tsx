import { SettingsContext, SettingsDispatchContext } from '@/contexts/Settings';
import { SettingsActions } from '@/contexts/Settings/settings.types';
import { useContext } from 'react';
import { ModalSettingsView } from './ModalSettingsView';
import { useSetDataInSync } from '@/customHooks/useSetDataForLocal';
import toast from 'react-hot-toast';

export const ModalSettingsContainer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const { settingsDispatch, temporarySettingsDispatch } = useContext(SettingsDispatchContext);
    const {
        settings, temporarySettings
    } = useContext(SettingsContext);
    const { setDataForSync } = useSetDataInSync();

    const handleSave = () => {
        /* 
        por hacer
        Confirmacion en mensajito que se guardo la configuracion
        */
        if (!isValidSettings()) return;

        settingsDispatch({ type: SettingsActions.updateSettings, payload: temporarySettings });
        setDataForSync({ userSettings: temporarySettings });
        onClose();
        toast.success('Settings saved');
    };

    const handleCancel = () => {
        temporarySettingsDispatch({ type: SettingsActions.resetSettings, payload: settings });
        onClose();
    };

    const isValidSettings = () => {
        if (!temporarySettings?.recentTabsLimit) return false;

        if (!temporarySettings?.suspendTabsAfter) return false;

        return true;
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
