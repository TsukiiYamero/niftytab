import { useEffect, useReducer, type ReactNode } from 'react';
import { SettingsContext, SettingsDispatchContext } from '../SettingsContext';
import { ModalSettingsContainer } from '@/ui/organisms/ModalSettings';
import { useDisclosure } from '@nextui-org/react';
import { settingsReducer, temporaryUserSettingsReducer } from '../reducer/settingsReducer';
import { SettingsActions } from '../settings.types';
import type { UserSettings } from '@/models/userSettings.types';

type Props = {
    children: ReactNode;
}

const initialState: UserSettings = {
    excludeList: [],
    maxTabsinMemory: 3,
    suspendTabsAfter: 5,
    keepTabsInMemory: true,
    suspendTabsAtStartup: false,
    neverSuspendAudibleTabs: false,
    excludeTabsFromList: false
};

export const SettingsProvider = ({ children }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [settings, dispatch] = useReducer(settingsReducer, initialState);
    const [temporarySettings, dispatchTemporary] = useReducer(temporaryUserSettingsReducer, initialState);

    useEffect(() => {
        dispatchTemporary({ type: SettingsActions.resetSettings, payload: settings });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SettingsContext.Provider value={{ openSettings: onOpen, isOpen, settings, temporarySettings }} >
            <SettingsDispatchContext.Provider value={{
                settingsDispatch: dispatch,
                temporarySettingsDispatch: dispatchTemporary
            }}>
                {children}
                <ModalSettingsContainer isOpen={isOpen} onClose={onClose} />
            </SettingsDispatchContext.Provider>
        </SettingsContext.Provider>
    );
};
