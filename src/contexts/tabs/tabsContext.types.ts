import { TabsSupabase } from '@/models';

export type TabSection = 'tabs' | 'groups' | 'sessions';

export interface TabsStore {
    local: TabsSupabase[];
    saved: TabsSupabase[];
    tabSection: TabSection;
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
    | { type: TabsActions.updatedLocal; payload: TabsSupabase[]; }
    | { type: TabsActions.updatedSaved; payload: TabsSupabase[]; }
    | { type: TabsActions.tabsSection; payload: TabSection };
