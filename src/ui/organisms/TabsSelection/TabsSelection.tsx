
import { IconButtonTab } from "@/ui/atoms/Buttons"
import { GroupTabsIcon, SessionIcon, TabsIcon } from "@/ui/atoms/icons"

type Props = {}

const TabsSelection = (props: Props) => {
    return (
        <div>
            <IconButtonTab text="Tabs" icon={<TabsIcon />} onClick={() => { }} />
            <IconButtonTab text="GroupTabs" icon={<GroupTabsIcon />} onClick={() => { }} />
            <IconButtonTab text="Sessions" icon={<SessionIcon />} onClick={() => { }} />
        </div>
    )
}

export default TabsSelection