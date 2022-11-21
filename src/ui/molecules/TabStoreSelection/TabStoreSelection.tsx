import { TabsActions, TabsStoredType } from '@/contexts/tabs';
import { useGetTabsContext, useGetTabsDispatchContext } from '@/contexts/tabs/hooks';
import { StandardButton } from '@/ui/atoms/Buttons';
import { CloudIcon, LaptopIcon } from '@/ui/atoms/icons';

export const TabStoreSelection = () => {
    const { loading, typeOfStore, local, saved } = useGetTabsContext();
    const dispatch = useGetTabsDispatchContext();

    const changeTabStoredType = (storedType: TabsStoredType) => {
        dispatch({ type: TabsActions.changeTypeOfStore, payload: storedType });
    };

    const quantityOfTabs = `${(typeOfStore === TabsStoredType.local
        ? local.length
        : saved.length)} Tabs`;

    return (
        <div style={{ display: 'flex', paddingBlock: '8px' }}>
            <StandardButton
                active={typeOfStore === TabsStoredType.local}
                disabled={loading}
                icon={<LaptopIcon />}
                onClick={() => changeTabStoredType(TabsStoredType.local)}
            />

            <StandardButton
                active={typeOfStore === TabsStoredType.saved}
                disabled={loading}
                icon={<CloudIcon />}
                onClick={() => changeTabStoredType(TabsStoredType.saved)}
            />

            <span>
                {
                    quantityOfTabs
                }
            </span>
        </div>
    );
};
