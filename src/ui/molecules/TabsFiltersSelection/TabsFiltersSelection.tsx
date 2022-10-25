import './tabsFilterSelection.css';
import { StandardButton } from '@/ui/atoms/Buttons';
import { BarsIcon, FilterIcon } from '@/ui/atoms/icons';
import { IconsSize } from '@/utils/icons/iconsPropertys';
import { useState } from 'react';
import { TabStoreSelection } from '../TabStoreSelection';

type TabsSelection = {
    smallView?: boolean;
    normalView?: boolean;
}

enum TabSelectionOpts {
    smallView = 'smallView',
    normalView = 'normalView'
}

const TabsFiltersSelection = () => {
    const [filter, setFilter] = useState<TabsSelection>({ smallView: true });

    const changeActiveFilter = (ev: TabSelectionOpts) => {
        setFilter({
            [ev]: true
        });
    };

    return (
        <div className="tab-store-selection-container">
            <TabStoreSelection />
            <div className="tab-store-selection-filter-view">
                <StandardButton
                    active={filter.smallView}
                    disabled={false}
                    icon={<BarsIcon />}
                    iconSize={IconsSize.small}
                    onClick={() => changeActiveFilter(TabSelectionOpts.smallView)}
                />

                <StandardButton
                    active={filter.normalView}
                    icon={<FilterIcon />}
                    iconSize={IconsSize.small}
                    onClick={() => changeActiveFilter(TabSelectionOpts.normalView)}
                />
            </div>
        </div>
    );
};

export default TabsFiltersSelection;
