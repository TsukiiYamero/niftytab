import { TabsActions, TabsActionType, TabSectionFilter, TabsStore, TabsStoredType } from '../tabsContext.types';

export const tabsInitialState: TabsStore = {
    local: [],
    saved: [],
    tabSection: TabSectionFilter.tabs,
    typeOfStore: TabsStoredType.local,
    loading: false
};

export const tabsReducer = (state = tabsInitialState, action: TabsActionType) => {
    switch (action.type) {
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
        case TabsActions.deleteTabInSaved:
            return {
                ...state,
                saved: state.saved.filter(tab => tab.url !== action.payload),
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
