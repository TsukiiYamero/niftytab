
import { IconButtonTab } from "@/ui/atoms/Buttons"
import { FoldersIcon, SessionIcon, TabsIcon } from "@/ui/atoms/icons"
import { TabsSelectionWrapper } from './styledComponents/TabsSelectionWrapper.styled';

type Props = {}

const TabsSelection = (props: Props) => {
    return (
        <TabsSelectionWrapper>
            <IconButtonTab text="Tabs" icon={<TabsIcon />} onClick={() => { }} />
            <IconButtonTab text="GroupTabs" icon={<FoldersIcon />} onClick={() => { }} />
            <IconButtonTab text="Sessions" icon={<SessionIcon />} onClick={() => { }} />
        </TabsSelectionWrapper>
    )
}

export default TabsSelection