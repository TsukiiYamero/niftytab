import { useGetAllTabs } from '@/customHooks/tabs';
import { TabsTracker } from '@/ui/organisms/TabsTracker';

export const ShowTabs = () => {
    const { tabs } = useGetAllTabs();

    return (
        <section className='grid justify-items-center gap-5'>
            <TabsTracker tabs={tabs} />
        </section>
    );
};
