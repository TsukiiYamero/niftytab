import { memo } from 'react';
import { AuthenticatedContent } from '@/ui/atoms/AuthenticatedContent';
import { CloudListings } from '../../presentational';
import { useTabsCloudOptionList } from '@/customHooks/tabs/useTabsSavedOptionList';
import { useGetTabsCloud } from '@/customHooks/tabs/useGetTabsCloud';
import { useSetTabsCloud } from '@/customHooks/tabs/useSetTabsCloud';
import { useGetTabsContext } from '@/contexts/tabs/hooks';

type props = {
    loading: boolean;
}

export const TabsListingsCloud = ({ loading }: props) => {
    const makeTabsOptsList = useTabsCloudOptionList();
    const { tabsCloud } = useGetTabsCloud();
    useSetTabsCloud(tabsCloud);
    const { cloud } = useGetTabsContext();

    return (
        <AuthenticatedContent>
            <CloudListings cloudGroup={cloud} loading={loading} makeTabsOptsList={makeTabsOptsList} />
        </AuthenticatedContent>
    );
};

export const MemoizedTabsListingsCloud = memo(TabsListingsCloud);
