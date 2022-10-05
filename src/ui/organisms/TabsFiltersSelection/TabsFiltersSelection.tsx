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
            <StandardButton text={""} icon={<BarsIcon />} iconSize={IconsSize.small} onClick={() => { }} />
            <StandardButton text={""} icon={<FilterIcon />} iconSize={IconsSize.small} onClick={() => { }} />
        </TabsFiltersSelectionWrapper>
    )
}

export default TabsFiltersSelection