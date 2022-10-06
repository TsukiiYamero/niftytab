import { IconButtonSimple, StandardButton } from '@/ui/atoms/Buttons'
import { BarsIcon, FilterIcon } from '@/ui/atoms/icons'
import { IconsSize } from '@/utils/icons/iconsPropertys'
import { useState } from 'react'
import { TabsFiltersSelectionWrapper } from './TabsFilterSelectionWrapper/TabsFilterSelectionWrapper'

type TabsSelection = {
    smallView?: boolean,
    normalView?: boolean,
}

enum TabSelectionOpts {
    smallView = "smallView",
    normalView = "normalView",
}

const TabsFiltersSelection = () => {

    const [filter, setFilter] = useState<TabsSelection>({ smallView: true })

    const changeActiveFilter = (ev: TabSelectionOpts) => {
        setFilter({
            [ev]: true
        })
    }

    return (
        <TabsFiltersSelectionWrapper>
            <StandardButton
                active={filter.smallView}
                disabled={false}
                icon={<BarsIcon />}
                iconSize={IconsSize.small}
                onClick={() => changeActiveFilter(TabSelectionOpts.smallView)} />

            <StandardButton
                active={filter.normalView}
                icon={<FilterIcon />}
                iconSize={IconsSize.small}
                onClick={() => changeActiveFilter(TabSelectionOpts.normalView)} />
        </TabsFiltersSelectionWrapper>
    )
}

export default TabsFiltersSelection