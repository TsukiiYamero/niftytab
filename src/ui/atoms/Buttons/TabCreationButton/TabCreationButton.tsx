import { createRipple } from '@/utils';
import { IconsSize } from '@/utils/icons/iconsPropertys';
import { cloneElement, MouseEvent, ReactElement } from 'react';
import './tabCreationButton.css';

type Props = {
    iconLeft: {
        icon: ReactElement;
        iconSize?: IconsSize;
    };
    text: string;
    iconRight: {
        icon: ReactElement;
        iconSize?: IconsSize;
    };
    onClick: (ev: MouseEvent<HTMLDivElement>) => void;
};

export const TabCreationButton = ({
    iconLeft,
    text,
    iconRight,
    onClick
}: Props) => {
    const IconLeft =
        iconLeft &&
        cloneElement(iconLeft.icon, {
            className: `standard-btn-icon-color ${iconLeft.iconSize ?? ''} ${
                iconLeft.icon.props.className
                    ? iconLeft.icon.props.className
                    : ''
            }`
        });

    const IconRight =
        iconRight &&
        cloneElement(iconRight.icon, {
            className: `standard-btn-icon-color ${iconRight.iconSize ?? ''} ${
                iconRight.icon.props.className
                    ? iconRight.icon.props.className
                    : ''
            }`
        });

    const handleOnClickTabCreation = (ev: MouseEvent<HTMLDivElement>) => {
        createRipple(ev);
        onClick(ev);
    };

    return (
        <div
            className="tab-creation-container"
            onClick={handleOnClickTabCreation}
        >
            {IconLeft}
            <span>{text}</span>
            {IconRight}
        </div>
    );
};
