import { TabsActions, TabSectionFilter } from '@/contexts/tabs';
import { useGetTabsContext, useGetTabsDispatchContext } from '@/contexts/tabs/hooks';
import { StandardButton } from '@/ui/atoms/Buttons';
import { FoldersIcon, SessionIcon, TabsIcon } from '@/ui/atoms/icons';
import { AddTabs } from '@/ui/organisms/AddTabs';
import { TabsSelectionWrapper } from './styledComponents/TabsSelectionWrapper.styled';

const TabsSelection = () => {
    const { tabSection, loading } = useGetTabsContext();
    const dispatch = useGetTabsDispatchContext();

    const changeActiveTab = (ev: TabSectionFilter) => {
        dispatch({ type: TabsActions.changeTabsSection, payload: ev });
    };

    return (
        <TabsSelectionWrapper>
            <StandardButton
                active={tabSection === TabSectionFilter.tabs}
                disabled={loading}
                text="Tabs"
                icon={<TabsIcon />}
                onClick={() => changeActiveTab(TabSectionFilter.tabs)}
            />

            <StandardButton
                active={tabSection === TabSectionFilter.groups}
                disabled={loading}
                text="Groups"
                icon={<FoldersIcon />}
                onClick={() => changeActiveTab(TabSectionFilter.groups)}
            />

            <StandardButton
                active={tabSection === TabSectionFilter.sessions}
                disabled={loading}
                text="Sessions"
                icon={<SessionIcon />}
                onClick={() => changeActiveTab(TabSectionFilter.sessions)}
            />

            <div>
                <AddTabs />
            </div>
        </TabsSelectionWrapper>
    );
};

export default TabsSelection;
