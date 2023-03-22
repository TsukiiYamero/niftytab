import { TabsCloud, NiftyTab } from '@/models';
import { ContentNotFound } from '@/ui/atoms/ContentNotFound';
import { SimpleLoading } from '@/ui/atoms/Loadings';
import { AccordionTabs } from '@/ui/molecules/AccordionTabs/AccordionTabs';
import { OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { Box } from '@mui/material';

type Props = {
    cloudGroup: TabsCloud[],
    loading?: boolean,
    makeTabsOptsList: (tab: NiftyTab) => OptionBtnMenuList[];
}

export const CloudListings = ({ cloudGroup, loading = false, makeTabsOptsList }: Props) => {
    return (
        <Box sx={{
            overflow: 'auto'
        }}>
            {
                loading
                    ? <SimpleLoading />
                    : <ContentNotFound condition={cloudGroup.length > 0}>
                        <Box sx={{
                            padding: '4px'
                        }}>
                            {
                                cloudGroup.map(group =>
                                    <AccordionTabs key={group.id} cloudGroup={group} makeTabsOptsList={makeTabsOptsList} />
                                )
                            }
                        </Box>
                    </ ContentNotFound>
            }
        </Box>
    );
};
