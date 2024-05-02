import { TabsList } from '@/ui/molecules/TabsList';

export const TabsTracker = ({ tabs }: { tabs: chrome.tabs.Tab[] }) => {
    return (
        <article className=" bg-[#121019] p-3 rounded-md border-1 border-[--primary-color-45]">

            <div className='flex'>
                <div>
                    <h3 className='text-[length:var(--font-size-semi-title)] font-semibold'>Tabs Tracker</h3>
                    <p className='text-[length:var(--font-size-tiny)] text-[--neutral-color-alt-primary]'>Watch tabs that are suspended or active and monitor your resources.</p>
                </div>

            </div>

            <TabsList tabs={tabs} />
        </article>
    );
};
