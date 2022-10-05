
import { StandardButton } from "@/ui/atoms/Buttons"
import { FoldersIcon, SessionIcon, TabsIcon } from "@/ui/atoms/icons"
import { TabsSelectionWrapper } from './styledComponents/TabsSelectionWrapper.styled';

type Props = {}

const TabsSelection = (props: Props) => {
    return (
        <TabsSelectionWrapper>
            <StandardButton text="Tabs" icon={<TabsIcon />} onClick={() => { }} />
            <StandardButton text="GroupTabs" icon={<FoldersIcon />} onClick={() => { }} />
            <StandardButton text="Sessions" icon={<SessionIcon />} onClick={() => { }} />
        </TabsSelectionWrapper>
    )
}

export default TabsSelection