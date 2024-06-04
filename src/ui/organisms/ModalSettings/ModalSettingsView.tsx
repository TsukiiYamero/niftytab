import { SuspendSettingsContainer } from '@/ui/molecules/SuspendSettings';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { IconSettings } from '@tabler/icons-react';

interface Props {
    onClose: () => void,
    isOpen: boolean,
    onSave: () => void,
    onCancel: () => void
}

export const ModalSettingsView: React.FC<Props> = ({ onClose, isOpen, onSave, onCancel }: Props) => {
    return (
        <Modal size={'full'}
            isOpen={isOpen}
            onClose={onClose} >
            <ModalContent>
                {
                    (onClose: any) => (
                        <>
                            <ModalHeader style={{ paddingBottom: '6px' }} >

                                <div className="flex gap-3 items-center">
                                    <IconSettings className='h-5 w-5 text-[--neutral-color-alt-primary]' />
                                    Tabs Suspension settings
                                </div>
                            </ModalHeader>

                            <ModalBody>
                                <div className='h-[280px] overflow-auto'>
                                    <SuspendSettingsContainer />
                                </div>

                                <ModalFooter style={{ paddingTop: '6px' }} className='flex gap-5'>
                                    <Button variant='flat' onPress={onCancel}>
                                        Cancel
                                    </Button>
                                    <Button color="success" variant='flat' onPress={onSave}>
                                        Save
                                    </Button>
                                </ModalFooter>
                            </ModalBody>
                        </>)
                }
            </ModalContent>
        </Modal>
    );
};
