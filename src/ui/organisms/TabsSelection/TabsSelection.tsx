
import { IconButtonTab } from "@/ui/atoms/Buttons"
import { TabsIcon } from "@/ui/atoms/icons"

type Props = {}

const TabsSelection = (props: Props) => {
    return (
        <div>
            <IconButtonTab text="Tabs" icon={<TabsIcon />} onClick={() => { }} />
            <IconButtonTab text="GroupTabs" icon={<TabsIcon />} onClick={() => { }} />
            <IconButtonTab text="Sessions" icon={<TabsIcon />} onClick={() => { }} />
        </div>
    )
}

export default TabsSelection