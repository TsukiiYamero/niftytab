import { TabSectionFilter, TabsActions, TypeOfStore } from '@/contexts/tabs';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { StandardButton } from '@/ui/atoms/Buttons';
import { CloudIcon, LaptopIcon } from '@/ui/atoms/icons';
import { useNavigate } from 'react-router-dom';

export const TabStoreSelection = () => {
    const { loading, typeOfStore, tabSection } = useGetTabsContext();
    const dispatch = useTabsDispatch();
    const navigate = useNavigate();

    const changeTabStoredType = (storedType: TypeOfStore) => {
        dispatch({ type: TabsActions.changeTypeOfStore, payload: storedType });
        navigate(`/${tabSection}/${storedType}`);
        console.log(`/${tabSection}/${storedType}`);
    };

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
                            active={typeOfStore === TypeOfStore.local}
                            disabled={loading}
                            icon={<LaptopIcon />}
                            onClick={() => changeTabStoredType(TypeOfStore.local)}
                            title='Tabs currently in the window'
                        />

                        <StandardButton
                            active={typeOfStore === TypeOfStore.saved}
                            disabled={loading}
                            icon={<CloudIcon />}
                            onClick={() => changeTabStoredType(TypeOfStore.saved)}
                            title='Tabs Saved in the cloud'
                        />
                    </>
            }
        </div>
    );
};
