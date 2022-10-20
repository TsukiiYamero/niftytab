import { ChromeTabs, TabsSupabase } from '@/models';

export enum TabSectionFilter {
    tabs = 'tabs',
    groups = 'groups',
    sessions = 'sessions'
};

export interface TabsStore {
    local: ChromeTabs[];
    saved: TabsSupabase[];
    tabSection: TabSectionFilter;
    loading: boolean;
}

export enum TabsActions {
    requestTabs = 'request_tabs',
    updatedLocal = 'updated_local',
    updatedSaved = 'updated_saved',
    tabsSection = 'tabs_section'
}

export type TabsActionType =
    | { type: TabsActions.requestTabs }
    | { type: TabsActions.updatedLocal; payload: ChromeTabs[]; }
    | { type: TabsActions.updatedSaved; payload: TabsSupabase[]; }
    | { type: TabsActions.tabsSection; payload: TabSectionFilter };
