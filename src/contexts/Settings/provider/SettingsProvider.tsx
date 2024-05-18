import { useEffect, useReducer, type ReactNode } from 'react';
import { SettingsContext, SettingsDispatchContext } from '../SettingsContext';
import { ModalSettings } from '@/ui/organisms/ModalSettings';
import { useDisclosure } from '@nextui-org/react';
import { settingsReducer, temporaryUserSettingsReducer } from '../reducer/settingsReducer';
import { SettingsActions } from '../settings.types';

type Props = {
    children: ReactNode;
}

const initialState = {
    excludeList: [],
    maxTabsinMemory: 1,
    suspendAudibleTabs: false,
    suspendTabsAtStartup: false,
    excludeTabsFromList: false,
    keepTabsInMemory: true
};

export const SettingsProvider = ({ children }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [settings, dispatch] = useReducer(settingsReducer, initialState);
    const [temporarySettings, dispatchTemporary] = useReducer(temporaryUserSettingsReducer, initialState);

    useEffect(() => {
        dispatchTemporary({ type: SettingsActions.resetSettings, payload: settings });
    }, [settings]);

    return (
        <SettingsContext.Provider value={{ openSettings: onOpen, isOpen, settings, temporarySettings }} >
            <SettingsDispatchContext.Provider value={{
                settingsDispatch: dispatch,
                temporarySettingsDispatch: dispatchTemporary
            }}>
                {children}
                <ModalSettings isOpen={isOpen} onClose={onClose} />
            </SettingsDispatchContext.Provider>
        </SettingsContext.Provider>
    );
};
