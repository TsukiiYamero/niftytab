import { ReactNode } from 'react';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import { Badge, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import './session_item.css';

type Props = {
    children?: ReactNode;
    title: string;
    badgeContent: number;
    optionStartIcon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string;
    }
}

export const SessionItem = ({ children, title, optionStartIcon, badgeContent }: Props) => {
    return (
        <div className="session-small-view__container"
            title={`${title}`}
        >
            <Badge badgeContent={badgeContent} color="primary">
                <InboxOutlinedIcon sx={{
                    width: '44px',
                    height: '44px'
                }} {...optionStartIcon} />
            </Badge>

            <span className={'overflow-ellipsis'}>{title}</span>

            {children ?? null}
        </div>
    );
};
