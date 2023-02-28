import { AllTabsInfo, NiftyTab, SessionNiftyCount } from '@/models';

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
    filterSection: TabSectionFilter;
    filterQuery: string;
    local: NiftyTab[];
    cloud: AllTabsInfo[];
    sessions: SessionNiftyCount[];
    tabSection: TabSectionFilter;
    typeOfStore: TypeOfStore;
    loading: boolean;
}

export enum TabsActions {
    requestTabs = 'request_tabs',
    resetTabs = 'reset_tabs',
    finishRequestTabs = 'finish_request_tabs',

    isFiltering = 'is_filtering',
    changeFilterSection = 'change_filter_section',
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
    | { type: TabsActions.changeFilterSection; payload: TabSectionFilter; }
    | { type: TabsActions.filterQuery; payload: string; }

    | { type: TabsActions.updateLocal; payload: NiftyTab[]; }
    | { type: TabsActions.updateCloud; payload: AllTabsInfo[]; }
    | { type: TabsActions.updateSessions; payload: SessionNiftyCount[]; }

    | { type: TabsActions.deleteTabInCloud; payload: string; }
    | { type: TabsActions.deleteSession; payload: number; }

    | { type: TabsActions.changeTabsSection; payload: TabSectionFilter }
    | { type: TabsActions.changeTypeOfStore; payload: TypeOfStore };
