import TabsFiltersSelection from '../../molecules/TabsFiltersSelection/TabsFiltersSelection';
import TabsSelection from '../../molecules/TabsSelection/TabsSelection';

type Props = {};

export const TabNavbar = (props: Props) => {
    return (
        <div>
            <TabsSelection />
            <span
                style={{
                    borderBottom: '1px solid var(--border-color-secondary)',
                    display: 'flex',
                    borderRadius: '6px'
                }}
            ></span>
            <TabsFiltersSelection />
        </div>
    );
};
