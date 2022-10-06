import { IconButtonSimple, StandardButton } from '@/ui/atoms/Buttons'
import { BarsIcon, FilterIcon } from '@/ui/atoms/icons'
import { IconsSize } from '@/utils/icons/iconsPropertys'
import { TabsFiltersSelectionWrapper } from './TabsFilterSelectionWrapper/TabsFilterSelectionWrapper'

type Props = {}

const TabsFiltersSelection = (props: Props) => {
    return (
        <TabsFiltersSelectionWrapper>
            {/*            <IconButtonTab>
                <FilterIcon />
            </IconButtonTab> */}
            <StandardButton icon={<BarsIcon />} iconSize={IconsSize.small} onClick={() => { }} />
            <StandardButton buttonStyle="btn-primary" icon={<FilterIcon />} iconSize={IconsSize.small} onClick={() => { }} />
        </TabsFiltersSelectionWrapper>
    )
}

export default TabsFiltersSelection