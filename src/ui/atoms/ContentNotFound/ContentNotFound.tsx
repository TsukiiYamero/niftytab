import { TabsNotFound } from '@/ui/organisms/TabsListings';
import { ReactNode } from 'react';

type Props = {
    condition: boolean;
    children: ReactNode;
}

/**
 * If `condition` return false show `TabsNotFound` comp
 */
export const ContentNotFound = ({ condition, children }: Props) => {
    if (condition) return <>{children}</>;

    return <TabsNotFound />;
};
