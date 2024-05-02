import { useGetAllTabs } from '@/customHooks/tabs';
import { TabsTracker } from '@/ui/organisms/TabsTracker';

export const ShowTabs = () => {
    const { tabs } = useGetAllTabs();

    return (
        <section>
            <TabsTracker tabs={tabs} />
        </section>
    );
};
