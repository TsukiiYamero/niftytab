import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import { IconFolder, IconFolderPlus } from '@tabler/icons-react';

export const SaveTabs = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <section className='grid justify-items-center gap-6'>
            <div className='flex flex-col gap-2 items-center'>

                <div className="flex flex-col text-center gap-1">
                    <p className='text-[length:var(--font-size-tiny)] text-[--neutral-color-alt-primary]'>
                        Save Tabs in group and then open them <br></br> whenever you want in other computer or browser.
                    </p>

                    <p className="font-bold text-[length:var(--font-size-secondary-title)]">Create Group Tabs</p>
                </div>

            </div>

            <div className="flex w-full gap-7">
                <div className='flex flex-col items-center gap-2 cursor-pointer *:hover:text-[--white] *:transition-transform-colors'>
                    <IconFolder className='w-[--icons-size-primary] h-[--icons-size-primary] text-[--neutral-color-alt-primary]' />
                    <p className='text-[length:var(--font-size-standard)] max-w-[120px] text-ellipsis overflow-hidden whitespace-nowrap text-[--neutral-color-alt-primary]'>
                        Study Session
                    </p>
                </div>

                <div onClick={onOpen} className='flex flex-col items-center gap-2 cursor-pointer *:hover:text-[--white] *:transition-transform-colors'>
                    <IconFolderPlus className='w-[--icons-size-primary] h-[--icons-size-primary] text-[--neutral-color-alt-primary]' />
                    <p className='text-[length:var(--font-size-standard)] max-w-[120px] text-ellipsis overflow-hidden whitespace-nowrap text-[--neutral-color-alt-primary]'>
                        Create Group
                    </p>
                </div>
            </div>

            <div>
                <Modal
                    size={'xl'}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalContent>
                        {
                            (onClose) => (
                                <>
                                    <ModalHeader style={{ paddingBottom: '6px' }} >

                                        <div className="flex gap-3 items-center">
                                            <IconFolderPlus className='h-5 w-5 text-[--white]' />
                                            Create Tabs Group
                                        </div>
                                    </ModalHeader>

                                    <ModalBody>
                                        <div>
                                            adsad
                                        </div>

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
            </div>
        </section>
    );
};
