import { TabNavbar } from "@/ui/organisms/TabNavbar"
import { TabsPresentational } from "@/ui/organisms/TabsPresentational"


type Props = {}

const TabsSection = (props: Props) => {
  return (
    <div>
      <TabNavbar />
      <TabsPresentational />
    </div>
  )
}

export default TabsSection