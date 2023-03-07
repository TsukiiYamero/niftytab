
import { ReactNode } from 'react';
import { DataNotFound } from '@/ui/atoms/DataNotFound';

type Props = {
    condition: boolean;
    children: ReactNode;
}

/**
 * If `condition` return false show `TabsNotFound` comp
 */
export const ContentNotFound = ({ condition, children }: Props) => {
    if (condition) return <>{children}</>;

    return <DataNotFound />;
};
