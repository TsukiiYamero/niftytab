import { TabsActions, TabsStoredType } from '@/contexts/tabs';
import { useGetTabsContext, useGetTabsDispatchContext } from '@/contexts/tabs/hooks';
import { StandardButton } from '@/ui/atoms/Buttons';
import { CloudIcon, LaptopIcon } from '@/ui/atoms/icons';

export const TabStoreSelection = () => {
    const { typeOfStore } = useGetTabsContext();
    const dispatch = useGetTabsDispatchContext();

    const changeTabStoredType = (storedType: TabsStoredType) => {
        dispatch({ type: TabsActions.changeTypeOfStore, payload: storedType });
    };

    return (
        <div style={{ display: 'flex', paddingBlock: '8px' }}>
            <StandardButton
                active={typeOfStore === TabsStoredType.local}

                icon={<LaptopIcon />}
                onClick={() => changeTabStoredType(TabsStoredType.local)}
            />

            <StandardButton
                active={typeOfStore === TabsStoredType.saved}

                icon={<CloudIcon />}
                onClick={() => changeTabStoredType(TabsStoredType.saved)}
            />
        </div>
    );
};
