/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo } from 'react';
import { AuthenticatedContent } from '@/ui/atoms/AuthenticatedContent';
import { CloudListings } from '../../presentational';
import { useTabsCloudOptionList } from '@/customHooks/tabs/useTabsSavedOptionList';
import { useGetTabsCloud } from '@/customHooks/tabs/useGetTabsCloud';

export const TabsListingsCloud = () => {
    const { cloud, loading } = useGetTabsCloud();
    const makeTabsOptsList = useTabsCloudOptionList();

    return (
        <AuthenticatedContent>
            <CloudListings cloudGroup={cloud} loading={loading} makeTabsOptsList={makeTabsOptsList} />
        </AuthenticatedContent>
    );
};

export const MemoizedTabsListingsCloud = memo(TabsListingsCloud);
