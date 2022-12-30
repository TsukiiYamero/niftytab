import { useId, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

export type OptionBtnMenuList = {
    onClick: () => any, text: string, Icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string;
    }
}

type Props = {
    optionsMenu: OptionBtnMenuList[]
}

export const OptionBtnMenu = ({ optionsMenu }: Props) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const optionId = useId();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOnclickItem = (funcItem: () => void) => {
        setAnchorEl(null);
        funcItem();
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id={`${optionId}-btn`}
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id={`${optionId}-menu`}
                MenuListProps={{
                    'aria-labelledby': `${optionId}-btn`
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {optionsMenu.map(({ onClick, text, Icon }) => (
                    <MenuItem key={text} onClick={() => handleOnclickItem(onClick)}>
                        <ListItemIcon>
                            {Icon && <Icon sx={{ fontSize: '20px' }} />}
                        </ListItemIcon>

                        <ListItemText>{text}</ListItemText>

                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};
