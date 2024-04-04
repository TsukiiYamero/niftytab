import { useGetAllTabs } from '@/customHooks/tabs';
import { MainLayout } from '@/layouts';

export const Suspend = () => {
    const tabs = useGetAllTabs();

    console.log(tabs);

    return (
        <MainLayout textDescription='Reduce memory usage by suspending tabs' title='Suspend Tabs'>
            <div>
                a
            </div>
        </MainLayout>
    );
};
