import { useGetAllTabs } from '@/customHooks/tabs';
import { MainLayout } from '@/layouts';
import { TabsTracker } from '@/ui/organisms/TabsTracker';

export const Suspend = () => {
    const tabs = useGetAllTabs();

    console.log(tabs);

    return (
        <MainLayout textDescription='Reduce memory usage by suspending tabs' title='Suspend Tabs'>
            <section>
                <TabsTracker />
            </section>
        </MainLayout>
    );
};
