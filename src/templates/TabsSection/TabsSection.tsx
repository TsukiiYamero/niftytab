import { TabNavbar } from "@/ui/organisms/TabNavbar"
import { TabsPresentational } from "@/ui/organisms/TabsPresentational"
import { TabsSectionWrapper } from "./TabsSectionWrapper.styled"

const TabsSection = () => {
  return (
    <TabsSectionWrapper>
      <TabNavbar />
      <TabsPresentational />
    </TabsSectionWrapper>
  )
}

export default TabsSection