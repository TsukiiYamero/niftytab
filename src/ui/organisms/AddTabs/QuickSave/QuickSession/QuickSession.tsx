import { ChangeEvent, useState } from 'react';
import { Box, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { SESSION_DEFAULT } from '@/utils';

type Props = {
    closeQuickSession: () => void,
    setSessionName: (sessionName: string) => void,
}

export const QuickSession = ({ closeQuickSession, setSessionName }: Props) => {
    const [name, setName] = useState('');
    const [pristine, setPristine] = useState(true);

    const errorName = name.trim().length === 0;

    const onChangeSessionName = (ev: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setName(ev.target.value);
        setPristine(false);
    };

    const onSave = () => {
        setPristine(false);

        // This is because exist a session with the name 'default', and that session can not be deleted or created
        // maybe in the future i have to change it
        if (name.trim() === SESSION_DEFAULT) return;

        if (name.trim().length > 0)
            setSessionName(name);
    };

    return (
        <Box
            sx={{
                padding: '10px',
                display: 'flex',
                gap: '10px',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <h3>Save Session</h3>

            <TextField
                fullWidth
                required
                value={name}
                onChange={onChangeSessionName}
                error={!pristine && errorName}
                helperText={!pristine && errorName ? 'Please give a name for the session' : ''}
                label="Session Name"
                variant="outlined"
                id="text-create-session"
            />

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Button onClick={() => { closeQuickSession(); }} variant="text">cancel</Button>
                <Button onClick={() => { onSave(); }} variant="outlined">Save</Button>
            </Box>
        </Box>
    );
};
