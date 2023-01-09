import { } from 'react';
import { Box, Button } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';

type Props = {}

export const CustomSaveTabs = (props: Props) => {
    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    gap: '10px'
                }}>
                <Button fullWidth startIcon={<FolderCopyOutlinedIcon />} onClick={() => { }} variant="contained">Save In Group</Button>
                <Button fullWidth startIcon={<InboxOutlinedIcon />} onClick={() => { }} variant="contained">Save In Session</Button>
            </Box>
        </div>
    );
};
