import { TabSectionFilter, TabsActions, TabsStoredType } from '@/contexts/tabs';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { StandardButton } from '@/ui/atoms/Buttons';
import { CloudIcon, LaptopIcon } from '@/ui/atoms/icons';

export const TabStoreSelection = () => {
    const { loading, typeOfStore, local, saved, tabSection } = useGetTabsContext();
    const dispatch = useTabsDispatch();

    const changeTabStoredType = (storedType: TabsStoredType) => {
        dispatch({ type: TabsActions.changeTypeOfStore, payload: storedType });
    };

    const quantityOfTabs = `${(typeOfStore === TabsStoredType.local
        ? local.length
        : saved.length)} Tabs`;

    return (
        <div style={{ display: 'flex', paddingBlock: '8px' }}>
            {
                tabSection === TabSectionFilter.sessions
                    ? <StandardButton
                        active={true}
                        disabled={loading}
                        icon={<CloudIcon />}
                        onClick={() => { }}
                        title='Tabs Saved in the cloud'
                    />
                    : <>
                        <StandardButton
                            active={typeOfStore === TabsStoredType.local}
                            disabled={loading}
                            icon={<LaptopIcon />}
                            onClick={() => changeTabStoredType(TabsStoredType.local)}
                            title='Tabs currently in the window'
                        />

                        <StandardButton
                            active={typeOfStore === TabsStoredType.saved}
                            disabled={loading}
                            icon={<CloudIcon />}
                            onClick={() => changeTabStoredType(TabsStoredType.saved)}
                            title='Tabs Saved in the cloud'
                        />
                    </>
            }

            <span>
                {
                    quantityOfTabs
                }
            </span>
        </div>
    );
};
