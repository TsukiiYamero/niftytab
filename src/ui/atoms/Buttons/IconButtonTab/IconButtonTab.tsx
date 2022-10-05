import { ReactElement, cloneElement, MouseEvent } from 'react'
import styled from 'styled-components';
import { CustomButton, BtnStyles } from '../CustomButton';

type Props = {
    text: string;
    onClick: (ev: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => any;
    icon?: ReactElement;
    textStyle?: string;
    buttonStyle?: BtnStyles;
}

export const IconButtonTab = ({ icon, text, textStyle, onClick, buttonStyle }: Props) => {

    const Icon = icon && cloneElement(icon, {
        className: `main-text-color medium-icons-size ${icon.props.className}`
    })

    return (
        <CustomButton onClick={onClick} buttonStyle={buttonStyle}>
            {Icon}
            <TextCustomButton className={`${textStyle}`}>
                {text}
            </TextCustomButton>
        </CustomButton>
    )
}

const TextCustomButton = styled.span`
    color: var(--main-text-color);
    padding-left: 4px;
`