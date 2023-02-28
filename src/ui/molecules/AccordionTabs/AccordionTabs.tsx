import { Accordion, AccordionDetails, AccordionSummary, Badge, Box, Typography } from '@mui/material';
import { ExpandMore, ContentCopyOutlined } from '@mui/icons-material';
import { AllTabsInfo, NiftyTab } from '@/models';
import { TabsListing } from '@/ui/organisms/TabsListings';
import { OptionBtnMenuList } from '@/ui/molecules/OptionBtnMenu';
import { useId } from 'react';

type Props = {
    cloudGroup: AllTabsInfo;
    makeTabsOptsList: (tab: NiftyTab) => OptionBtnMenuList[];
}

export const AccordionTabs = ({ cloudGroup, makeTabsOptsList }: Props) => {
    const id = useId();

    return (
        <Accordion >
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id={id}
            >
                <Box sx={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'space-between',
                    paddingRight: '1rem'
                }}>
                    <Typography sx={{
                        textTransform: 'capitalize'
                    }}>
                        {cloudGroup.name}
                    </Typography>

                    <Badge badgeContent={cloudGroup.countBadge} color="default">
                        <ContentCopyOutlined titleAccess={`${cloudGroup.countBadge} Tabs in this session`} />
                    </Badge>
                </Box>
            </AccordionSummary>

            <AccordionDetails>
                <Box sx={{
                    width: 'fit-content',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    alignContent: 'flex-start',
                    marginInline: 'auto',
                    gap: '9px',
                    overflow: 'auto'
                }}>
                    {
                        cloudGroup.tabs.map(tab =>
                            <TabsListing key={tab.refererId} tab={tab} makeTabsOptsList={makeTabsOptsList(tab)} />
                        )
                    }
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};
