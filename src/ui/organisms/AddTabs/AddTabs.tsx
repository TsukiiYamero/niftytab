import { StandardButton } from "@/ui/atoms/Buttons"
import { TabCreationButton } from "@/ui/atoms/Buttons/TabCreationButton"
import { AddIcon, ArrowForward } from "@/ui/atoms/icons"
import { AddTabIcon } from "@/ui/atoms/icons/AddTabIcon"
import { Modal, useModal } from "@/ui/molecules/Modal"
import { IconsSize } from "@/utils/icons/iconsPropertys"
import { MouseEvent } from "react"
import './addTabs.css'

type Props = {}

export const AddTabs = (props: Props) => {

    const { isOpen, closeModal, openModal } = useModal();

    const iconLeft = {
        icon: <AddTabIcon />,
        iconSize: IconsSize.medium
    }

    const iconRight = {
        icon: <ArrowForward />,
        iconSize: IconsSize.medium
    }

    const handleTabCreation = async (ev: MouseEvent<HTMLDivElement>) => {

        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true,
        });
        console.log(tab);
    }

    const handleGroupCreation = (ev: MouseEvent<HTMLDivElement>) => {
        console.log("click", ev)
    }

    const handleSessionCreation = (ev: MouseEvent<HTMLDivElement>) => {
        console.log("click", ev)
    }

    return (
        <div>
            <StandardButton icon={<AddIcon />} text={"Add Tabs"} onClick={() => openModal()} />

            <Modal isOpen={isOpen} onClose={closeModal} modalClassSize={"modal-save-tabs-size"} >
                <div style={{ padding: "16px 10px", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <h2>Add Tabs</h2>

                    <TabCreationButton onClick={handleTabCreation} text="Save Tab" iconLeft={iconLeft} iconRight={iconRight} />
                    <TabCreationButton onClick={handleGroupCreation} text="Save Group" iconLeft={iconLeft} iconRight={iconRight} />
                    <TabCreationButton onClick={handleSessionCreation} text="Save Session" iconLeft={iconLeft} iconRight={iconRight} />
                </div>

            </Modal>
        </div>
    )
}
