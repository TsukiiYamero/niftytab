import './standarButton.css';
import { IconsSize } from '@/utils/icons/iconsPropertys';
import { ReactElement, cloneElement, MouseEvent } from 'react';
import { CustomButton, BtnStyles } from '../CustomButton';

type Props = {
    onClick: (ev: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => any;
    text?: string;
    icon?: ReactElement;
    iconSize?: IconsSize;
    textStyle?: string;
    buttonStyle?: BtnStyles;
    active?: boolean;
    disabled?: boolean;
    ripple?: boolean;
    type?: 'button' | 'submit';
};

export const StandardButton = ({
    icon,
    text,
    textStyle = '',
    iconSize = IconsSize.medium,
    buttonStyle = 'btn-normal',
    active = false,
    ripple = false,
    disabled = false,
    type = 'button',
    onClick
}: Props) => {
    const cssClassForActive = active ? 'standard-btn-active' : '';

    const Icon =
        icon &&
        cloneElement(icon, {
            className: `standard-btn-icon-color ${cssClassForActive} ${iconSize} ${icon.props.className ? icon.props.className : ''
                }`
        });

    return (
        <CustomButton
            onClick={onClick}
            buttonStyle={buttonStyle}
            active={active}
            disabled={disabled}
            ripple={ripple}
            type={type}
        >
            {Icon}
            {text && (
                <span
                    className={`standard-btn-text ${textStyle} ${cssClassForActive}`}
                >
                    {text}
                </span>
            )}
        </CustomButton>
    );
};
