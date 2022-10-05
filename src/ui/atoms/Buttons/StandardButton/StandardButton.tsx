import { IconsSize } from '@/utils/icons/iconsPropertys';
import { ReactElement, cloneElement, MouseEvent } from 'react'
import styled from 'styled-components';
import { CustomButton, BtnStyles } from '../CustomButton';

type Props = {
    onClick: (ev: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => any;
    text?: string;
    icon?: ReactElement;
    iconSize?: IconsSize;
    textStyle?: string;
    buttonStyle?: BtnStyles;
}

export const StandardButton = ({
    icon,
    text,
    textStyle,
    iconSize = IconsSize.medium,
    buttonStyle = 'btn-outline',
    onClick,
}: Props) => {

    const Icon = icon && cloneElement(icon, {
        className: `main-text-color ${iconSize} ${icon.props.className}`
    })

    return (
        <CustomButton onClick={onClick} buttonStyle={buttonStyle}>
            {Icon}
            {text &&
                <TextCustomButton className={`${textStyle}`}>
                    {text}
                </TextCustomButton>}
        </CustomButton>
    )
}

const TextCustomButton = styled.span`
    color: var(--main-text-color);
    padding-left: 4px;
`