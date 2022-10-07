import { StandardButton } from "@/ui/atoms/Buttons"
import { AddIcon } from "@/ui/atoms/icons"
import { Modal, useModal } from "@/ui/molecules/Modal"

type Props = {}

export const AddTabs = (props: Props) => {

    const { isOpen, closeModal, openModal } = useModal();

    return (
        <div>
            <StandardButton icon={<AddIcon />} text={"Add Tabs"} onClick={() => openModal()} />
            
            <Modal isOpen={isOpen} onClose={closeModal} typeSize={"custom"} >
                
            </Modal>
        </div>
    )
}
