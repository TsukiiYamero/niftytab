import { ChromeTabs } from '@/models'
import { TabSmallView } from '@/ui/atoms/TabSmallView'

type Props = {
    tab: ChromeTabs
}

export const TabsListing = ({ tab }: Props) => {
    return (
        <TabSmallView title={tab.title} urlText={tab.url} imgSrc={tab.favIconUrl} />
    )
}
