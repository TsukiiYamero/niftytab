import { TabsActions, TabsActionType, TabsStore } from '../tabsContext.types';

export const tabsInitialState: TabsStore = {
    local: [],
    saved: [],
    tabSection: 'tabs',
    loading: false
};

export const tabsReducer = (state = tabsInitialState, action: TabsActionType) => {
    switch (action.type) {
        case TabsActions.requestTabs:
            return {
                ...state,
                loading: true
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
        case TabsActions.tabsSection:
            return {
                ...state,
                tabSection: action.payload,
                loading: false
            };
        default:
            throw new Error('Unhandled action type');
    }
};
