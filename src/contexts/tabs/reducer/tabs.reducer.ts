import { NiftyTab, SessionNiftyCount } from '@/models';
import { TabsActions, TabsActionType, TabSectionFilter, TabsStore, TypeOfStore } from '../tabsContext.types';

export const tabsInitialState: TabsStore<NiftyTab | SessionNiftyCount> = {
    local: [],
    cloud: [],
    filtered: [],
    sessions: [],
    isFiltering: false,
    tabSection: TabSectionFilter.tabs,
    typeOfStore: TypeOfStore.local,
    loading: false
};

export const tabsReducer = (state = tabsInitialState, action: TabsActionType): TabsStore<NiftyTab | SessionNiftyCount> => {
    switch (action.type) {
        case TabsActions.resetTabs:
            return {
                ...state,
                cloud: [],
                sessions: [],
                filtered: [],
                isFiltering: false,
                typeOfStore: TypeOfStore.local,
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
        case TabsActions.updateLocal:
            return {
                ...state,
                local: action.payload,
                loading: false
            };

        case TabsActions.updateCloud:
            return {
                ...state,
                cloud: action.payload,
                loading: false
            };
        case TabsActions.updatedFiltered:
            return {
                ...state,
                filtered: action.payload,
                loading: false
            };
        case TabsActions.updateSessions:
            return {
                ...state,
                sessions: action.payload,
                loading: false
            };
        case TabsActions.deleteTabInCloud:
            return {
                ...state,
                cloud: state.cloud.filter(tab => tab.url !== action.payload),
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
