import { ReactNode, useReducer } from 'react';
import { tabsInitialState, tabsReducer } from '../reducer';
import { TabsDispatchContext, TabsStoreContext } from '../tabsContext';

type Props = {
    children: ReactNode;
}

export const TabsProvider = ({ children }: Props) => {
    const [tabsStore, dispatch] = useReducer(tabsReducer, tabsInitialState);

    return (
        <TabsStoreContext.Provider value={tabsStore}>
            <TabsDispatchContext.Provider value={dispatch}>
                {children}
            </TabsDispatchContext.Provider>
        </TabsStoreContext.Provider>
    );
};
