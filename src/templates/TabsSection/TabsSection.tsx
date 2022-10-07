import { TabNavbar } from "@/ui/organisms/TabNavbar"
import { TabsListingsContainer } from "@/ui/organisms/TabsListings"
import { TabsSectionWrapper } from "./TabsSectionWrapper.styled"

const TabsSection = () => {
  return (
    <TabsSectionWrapper>
      <TabNavbar />
      < TabsListingsContainer />
    </TabsSectionWrapper>
  )
}

export default TabsSection