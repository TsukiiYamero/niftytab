import { TabsContainer } from '@/ui/organisms/TabsContainer';
import { TabsPresentationalWrapper } from './TabsPresentationalWrapper.styled';

type Props = {}

export const TabsPresentational = (props: Props) => {
    return (
        <TabsPresentationalWrapper>
            <TabsContainer />
        </TabsPresentationalWrapper>
    )
}
