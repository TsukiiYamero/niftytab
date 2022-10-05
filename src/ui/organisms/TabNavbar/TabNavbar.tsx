import TabsFiltersSelection from "../TabsFiltersSelection/TabsFiltersSelection"
import TabsSelection from "../TabsSelection/TabsSelection"

type Props = {}

const TabNavbar = (props: Props) => {
  return (
    <div>
      <TabsSelection />
      <hr />
      <TabsFiltersSelection />
    </div>
  )
}

export default TabNavbar