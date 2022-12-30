import { NiftyTab, SessionNiftyCount } from '@/models';
import { TabsActions, TabsActionType, TabSectionFilter, TabsStore, TabsStoredType } from '../tabsContext.types';

export const tabsInitialState: TabsStore<NiftyTab | SessionNiftyCount> = {
    local: [],
    saved: [],
    filtered: [],
    sessions: [],
    isFiltering: false,
    tabSection: TabSectionFilter.tabs,
    typeOfStore: TabsStoredType.local,
    loading: false
};

export const tabsReducer = (state = tabsInitialState, action: TabsActionType): TabsStore<NiftyTab | SessionNiftyCount> => {
    switch (action.type) {
        case TabsActions.resetTabs:
            return {
                ...state,
                saved: [],
                sessions: [],
                filtered: [],
                isFiltering: false,
                typeOfStore: TabsStoredType.local,
                tabSection: TabSectionFilter.tabs,
                loading: false
            };
        case TabsActions.requestTabs:
            return {
                ...state,
                loading: true
            };
        case TabsActions.finishRequestTabs:
            return {
                ...state,
                loading: false
            };
        case TabsActions.updatedLocal:
            return {
                ...state,
                local: action.payload,
                loading: false
            };

        case TabsActions.updatedSaved:
            return {
                ...state,
                saved: action.payload,
                loading: false
            };
        case TabsActions.updatedFiltered:
            return {
                ...state,
                filtered: action.payload,
                loading: false
            };
        case TabsActions.updatedSessions:
            return {
                ...state,
                sessions: action.payload,
                loading: false
            };
        case TabsActions.deleteTabInSaved:
            return {
                ...state,
                saved: state.saved.filter(tab => tab.url !== action.payload),
                loading: false
            };
        case TabsActions.deleteSession:
            return {
                ...state,
                sessions: state.sessions.filter(session => session.id !== action.payload),
                loading: false
            };
        case TabsActions.isFiltering:
            return {
                ...state,
                isFiltering: action.payload,
                loading: false
            };
        case TabsActions.changeTabsSection:
            return {
                ...state,
                tabSection: action.payload,
                loading: false
            };
        case TabsActions.changeTypeOfStore:
            return {
                ...state,
                typeOfStore: action.payload,
                loading: false
            };
        default:
            throw new Error('Unhandled action type');
    }
};
