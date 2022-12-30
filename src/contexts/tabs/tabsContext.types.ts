import { NiftyTab, SessionNiftyCount } from '@/models';

export enum TabSectionFilter {
    tabs = 'tabs',
    groups = 'groups',
    sessions = 'sessions'
};

export enum TabsStoredType {
    local = 'local',
    saved = 'saved'
}

export interface TabsStore<T> {
    local: NiftyTab[];
    saved: NiftyTab[];
    sessions: SessionNiftyCount[];
    // i'm think if this should be the just a keyword
    // and where filtered is used, do the filter manual
    filtered: T[];
    isFiltering: boolean;
    tabSection: TabSectionFilter;
    typeOfStore: TabsStoredType;
    loading: boolean;
}

export enum TabsActions {
    requestTabs = 'request_tabs',
    resetTabs = 'reset_tabs',
    finishRequestTabs = 'finish_request_tabs',
    isFiltering = 'is_filtering',

    updatedFiltered = 'updated_filtered',
    updatedLocal = 'updated_local',
    updatedSaved = 'updated_saved',
    updatedSessions = 'updated_sessions',

    changeTabsSection = 'tabs_section',
    changeTypeOfStore = 'type_of_store',

    deleteSession = 'delete_sessions',
    deleteTabInSaved = 'delete_tab_in_saved',
}

export type TabsActionType =
    | { type: TabsActions.resetTabs; }
    | { type: TabsActions.requestTabs; }
    | { type: TabsActions.finishRequestTabs; }
    | { type: TabsActions.isFiltering; payload: boolean }

    | { type: TabsActions.updatedLocal; payload: NiftyTab[]; }
    | { type: TabsActions.updatedSaved; payload: NiftyTab[]; }
    | { type: TabsActions.updatedFiltered; payload: NiftyTab[] | SessionNiftyCount[]; }
    | { type: TabsActions.updatedSessions; payload: SessionNiftyCount[]; }

    | { type: TabsActions.deleteTabInSaved; payload: string; }
    | { type: TabsActions.deleteSession; payload: number; }

    | { type: TabsActions.changeTabsSection; payload: TabSectionFilter }
    | { type: TabsActions.changeTypeOfStore; payload: TabsStoredType };
