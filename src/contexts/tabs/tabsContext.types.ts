import { ChromeTabs, TabsSupabase } from '@/models';

export enum TabSectionFilter {
    tabs = 'tabs',
    groups = 'groups',
    sessions = 'sessions'
};

export enum TabsStoredType {
    local = 'local',
    saved = 'saved'
}

export interface TabsStore {
    local: ChromeTabs[];
    saved: TabsSupabase[];
    tabSection: TabSectionFilter;
    typeOfStore: TabsStoredType;
    loading: boolean;
}

export enum TabsActions {
    requestTabs = 'request_tabs',
    updatedLocal = 'updated_local',
    updatedSaved = 'updated_saved',
    changeTabsSection = 'tabs_section',
    changeTypeOfStore = 'type_of_store'
}

export type TabsActionType =
    | { type: TabsActions.requestTabs }
    | { type: TabsActions.updatedLocal; payload: ChromeTabs[]; }
    | { type: TabsActions.updatedSaved; payload: TabsSupabase[]; }
    | { type: TabsActions.changeTabsSection; payload: TabSectionFilter }
    | { type: TabsActions.changeTypeOfStore; payload: TabsStoredType };
