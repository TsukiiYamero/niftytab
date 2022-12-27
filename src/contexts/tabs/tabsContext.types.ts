import { NiftyTab } from '@/models';

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
    local: NiftyTab[];
    saved: NiftyTab[];
    filtered: NiftyTab[];
    isFiltering: boolean;
    tabSection: TabSectionFilter;
    typeOfStore: TabsStoredType;
    loading: boolean;
}

export enum TabsActions {
    resetTabs = 'reset_tabs',
    requestTabs = 'request_tabs',
    finishRequestTabs = 'finish_request_tabs',
    updatedLocal = 'updated_local',
    updatedSaved = 'updated_saved',
    updatedFiltered = 'updated_filtered',
    deleteTabInSaved = 'delete_tab_in_saved',
    isFiltering = 'is_filtering',
    changeTabsSection = 'tabs_section',
    changeTypeOfStore = 'type_of_store',
}

export type TabsActionType =
    | { type: TabsActions.resetTabs; }
    | { type: TabsActions.requestTabs; }
    | { type: TabsActions.finishRequestTabs; }
    | { type: TabsActions.finishRequestTabs; }
    | { type: TabsActions.updatedLocal; payload: NiftyTab[]; }
    | { type: TabsActions.updatedSaved; payload: NiftyTab[]; }
    | { type: TabsActions.updatedFiltered; payload: NiftyTab[]; }
    | { type: TabsActions.deleteTabInSaved; payload: string; }
    | { type: TabsActions.isFiltering; payload: boolean }
    | { type: TabsActions.changeTabsSection; payload: TabSectionFilter }
    | { type: TabsActions.changeTypeOfStore; payload: TabsStoredType };
