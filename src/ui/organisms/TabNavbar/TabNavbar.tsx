import TabsFiltersSelection from '../../molecules/TabsFiltersSelection/TabsFiltersSelection';
import TabsSelection from '../../molecules/TabsSelection/TabsSelection';
import { Box } from '@mui/material';

type Props = {};

export const TabNavbar = (props: Props) => {
    return (
        <div>
            <TabsSelection />
            <Box sx={{
                borderWidth: '1px',
                borderColor: '#ccc9c952',
                borderStyle: 'solid',
                borderRadius: '1rem'
            }}>
            </Box>
            <TabsFiltersSelection />
        </div>
    );
};
