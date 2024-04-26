import { type ReactNode } from 'react';
import { SettingsContext } from '../SettingsContext';
import { ModalSettings } from '@/ui/organisms/ModalSettings';
import { useDisclosure } from '@nextui-org/react';

type Props = {
    children: ReactNode;
}

export const SettingsProvider = ({ children }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <SettingsContext.Provider value={{ openSettings: onOpen, isOpen }} >
            {children}

            <ModalSettings isOpen={isOpen} onClose={onClose} />
        </SettingsContext.Provider>
    );
};
