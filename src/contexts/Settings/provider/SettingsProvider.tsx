import { useReducer, type ReactNode } from 'react';
import { SettingsContext, SettingsDispatchContext } from '../SettingsContext';
import { ModalSettings } from '@/ui/organisms/ModalSettings';
import { useDisclosure } from '@nextui-org/react';
import { settingsReducer } from '../reducer/settingsReducer';

type Props = {
    children: ReactNode;
}

export const SettingsProvider = ({ children }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [settings, dispatch] = useReducer(settingsReducer, {
        excludeList: [],
        maxTabsinMemory: 1,
        suspendAudibleTabs: false,
        suspendTabsAtStartup: false
    });

    return (
        <SettingsContext.Provider value={{ openSettings: onOpen, isOpen, settings }} >
            <SettingsDispatchContext.Provider value={dispatch}>
                {children}
                <ModalSettings isOpen={isOpen} onClose={onClose} />
            </SettingsDispatchContext.Provider>
        </SettingsContext.Provider>
    );
};
