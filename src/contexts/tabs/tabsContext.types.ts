import { NiftyTab, SessionNiftyCount } from '@/models';
import { CloudStore, LocalStore } from '@/utils/niftyDefaults';

export enum TabSectionFilter {
    tabs = 'tabs',
    groups = 'groups',
    sessions = 'sessions'
};

export enum TypeOfStore {
    local = LocalStore,
    cloud = CloudStore
}

export interface TabsStore<T> {
    local: NiftyTab[];
    cloud: NiftyTab[];
    sessions: SessionNiftyCount[];
    // i'm think if this should be the just a keyword
    // and where filtered is used, do the filter manual
    filtered: T[];
    isFiltering: boolean;
    tabSection: TabSectionFilter;
    typeOfStore: TypeOfStore;
    loading: boolean;
}

export enum TabsActions {
    requestTabs = 'request_tabs',
    resetTabs = 'reset_tabs',
    finishRequestTabs = 'finish_request_tabs',
    isFiltering = 'is_filtering',

    updatedFiltered = 'updated_filtered',
    updateLocal = `update_${LocalStore}`,
    updateCloud = `update_${CloudStore}`,
    updateSessions = 'update_sessions',

    changeTabsSection = 'tabs_section',
    changeTypeOfStore = 'type_of_store',

    deleteSession = 'delete_sessions',
    deleteTabInCloud = `delete_tab_in_${CloudStore}`,
}

export type TabsActionType =
    | { type: TabsActions.resetTabs; }
    | { type: TabsActions.requestTabs; }
    | { type: TabsActions.finishRequestTabs; }
    | { type: TabsActions.isFiltering; payload: boolean }

    | { type: TabsActions.updateLocal; payload: NiftyTab[]; }
    | { type: TabsActions.updateCloud; payload: NiftyTab[]; }
    | { type: TabsActions.updatedFiltered; payload: NiftyTab[] | SessionNiftyCount[]; }
    | { type: TabsActions.updateSessions; payload: SessionNiftyCount[]; }

    | { type: TabsActions.deleteTabInCloud; payload: string; }
    | { type: TabsActions.deleteSession; payload: number; }

    | { type: TabsActions.changeTabsSection; payload: TabSectionFilter }
    | { type: TabsActions.changeTypeOfStore; payload: TypeOfStore };
