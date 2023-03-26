import { TabsCloud, SessionCloud } from '@/models';

export enum TabSectionFilter {
    tabs = 'tabs',
    groups = 'groups',
    sessions = 'sessions'
};

export enum TypeOfStore {
    local = 'local',
    cloud = 'cloud'
}

export interface TabsStore {
    isFiltering: boolean;
    filterQuery: string;
    local: chrome.tabs.Tab[];
    cloud: TabsCloud[];
    sessions: SessionCloud[];
    tabSection: TabSectionFilter;
    typeOfStore: TypeOfStore;
    loading: boolean;
}

export enum TabsActions {
    requestTabs = 'request_tabs',
    resetTabs = 'reset_tabs',
    finishRequestTabs = 'finish_request_tabs',

    isFiltering = 'is_filtering',
    filterQuery = 'filter_query',

    updateLocal = 'update_local',
    updateCloud = 'update_cloud',
    updateSessions = 'update_sessions',

    changeTabsSection = 'tabs_section',
    changeTypeOfStore = 'type_of_store',

    deleteSession = 'delete_sessions',
    deleteTabInCloud = 'delete_tab_in_cloud',
}

export type TabsActionType =
    | { type: TabsActions.resetTabs; }
    | { type: TabsActions.requestTabs; }
    | { type: TabsActions.finishRequestTabs; }

    | { type: TabsActions.isFiltering; payload: boolean }
    | { type: TabsActions.filterQuery; payload: string; }

    | { type: TabsActions.updateLocal; payload: chrome.tabs.Tab[]; }
    | { type: TabsActions.updateCloud; payload: TabsCloud[]; }
    | { type: TabsActions.updateSessions; payload: SessionCloud[]; }

    | { type: TabsActions.deleteTabInCloud; payload: string; }
    | { type: TabsActions.deleteSession; payload: number; }

    | { type: TabsActions.changeTabsSection; payload: TabSectionFilter }
    | { type: TabsActions.changeTypeOfStore; payload: TypeOfStore };
