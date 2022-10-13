import { StandardButton } from '@/ui/atoms/Buttons';
import { FoldersIcon, SessionIcon, TabsIcon } from '@/ui/atoms/icons';
import { AddTabs } from '@/ui/organisms/AddTabs';
import { useState } from 'react';
import { TabsSelectionWrapper } from './styledComponents/TabsSelectionWrapper.styled';

type TabsSelectionType = {
    tabs?: boolean;
    groups?: boolean;
    sessions?: boolean;
};

enum TabSelectionOpts {
    tabs = 'tabs',
    groups = 'groups',
    sessions = 'sessions'
}

const TabsSelection = () => {
    const [active, setActive] = useState<TabsSelectionType>({ tabs: true });

    const changeActiveTab = (ev: TabSelectionOpts) => {
        setActive({
            [ev]: true
        });
    };

    return (
        <TabsSelectionWrapper>
            <StandardButton
                active={active.tabs}
                text="Tabs"
                icon={<TabsIcon />}
                onClick={() => changeActiveTab(TabSelectionOpts.tabs)}
            />

            <StandardButton
                active={active.groups}
                text="Groups"
                icon={<FoldersIcon />}
                onClick={() => changeActiveTab(TabSelectionOpts.groups)}
            />

            <StandardButton
                active={active.sessions}
                text="Sessions"
                icon={<SessionIcon />}
                onClick={() => changeActiveTab(TabSelectionOpts.sessions)}
            />

            <div>
                <AddTabs />
            </div>
        </TabsSelectionWrapper>
    );
};

export default TabsSelection;
