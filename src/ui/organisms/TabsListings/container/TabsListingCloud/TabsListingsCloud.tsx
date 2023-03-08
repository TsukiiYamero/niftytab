import { memo } from 'react';
import { AuthenticatedContent } from '@/ui/atoms/AuthenticatedContent';
import { CloudListings } from '../../presentational';
import { useTabsCloudOptionList } from '@/customHooks/tabs/useTabsSavedOptionList';
import { useGetTabsCloud } from '@/customHooks/tabs/useGetTabsCloud';
import { useSetTabsCloud } from '@/customHooks/tabs/useSetTabsCloud';

type props = {
    loading: boolean;
}

export const TabsListingsCloud = ({ loading }: props) => {
    const makeTabsOptsList = useTabsCloudOptionList();
    const { tabsCloud } = useGetTabsCloud();
    useSetTabsCloud(tabsCloud);

    return (
        <AuthenticatedContent>
            <CloudListings cloudGroup={tabsCloud} loading={loading} makeTabsOptsList={makeTabsOptsList} />
        </AuthenticatedContent>
    );
};

export const MemoizedTabsListingsCloud = memo(TabsListingsCloud);
