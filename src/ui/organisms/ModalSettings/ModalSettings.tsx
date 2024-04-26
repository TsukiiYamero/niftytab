import { SuspendSettings } from '@/ui/molecules/SuspendSettings';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { IconSettings } from '@tabler/icons-react';

export const ModalSettings = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    return (
        <Modal size={'xl'}
            isOpen={isOpen}
            onClose={onClose} >
            <ModalContent>
                {
                    (onClose) => (
                        <>
                            <ModalHeader style={{ paddingBottom: '6px' }} >

                                <div className="flex gap-3 items-center">
                                    <IconSettings className='h-5 w-5 text-[--neutral-color-alt-primary]' />
                                    Tabs Suspension settings
                                </div>
                            </ModalHeader>

                            <ModalBody>
                                <SuspendSettings />

                                <ModalFooter style={{ paddingTop: '6px' }} className='flex gap-5'>
                                    <Button variant='flat' onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button color="success" variant='flat' onPress={onClose}>
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
