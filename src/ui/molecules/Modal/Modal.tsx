import './modal.css';
import { memo, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { WrapperAnimation } from './WrapperAnimation';
import { IconButtonSimple } from '@/ui/atoms/Buttons';
import { CloseIcon } from '@/ui/atoms/icons';

export interface PropsModal {
    isOpen: boolean;
    onClose: () => void;
    closeByClickOutside?: boolean;
    closeByIcon?: boolean;
    children?: any;
    bgColorClass?: string;
    modalAnimationClass?: string;
    position?: 'centered' | 'custom';
    modalClassSize?: string;
    animationWrapper?: boolean;
    animationBgColor?: string;
    topModal?: number;
    leftModal?: number;
    posAnimationWrapper?: { top: number; left: number };
    titleIconElement?: any;
    id?: string;
    modalCustomClass?: string;
}

export const Modal = memo(
    ({
        isOpen,
        children,
        onClose,
        closeByClickOutside = true,
        closeByIcon = true,
        animationBgColor = 'rgba(18, 21, 25, 0.5)',
        bgColorClass = 'modal__bg-color',
        animationWrapper = true,
        modalAnimationClass = '',
        position = 'centered',
        modalClassSize = '',
        topModal = 0,
        leftModal = 0,
        posAnimationWrapper = { top: 0, left: 0 },
        id = '',
        modalCustomClass = ''
    }: PropsModal) => {
        const wrapperAnimationProps = {
            animationWrapper,
            ...posAnimationWrapper,
            animationBgColor
        };

        const positionModal = {
            top: `${topModal}px`,
            left: `${leftModal}px`
        };

        const handleCloseModal = () => {
            onClose && closeByIcon && onClose();
        };

        const handleCloseModalClickOutsider = () => {
            onClose && closeByClickOutside && onClose();
        };

        const handleClosePropagation = (ev: MouseEvent<HTMLDivElement>) => {
            ev.stopPropagation();
        };

        return createPortal(
            <>
                {isOpen && (
                    <div className="modal__container">
                        <WrapperAnimation {...wrapperAnimationProps} />

                        <div
                            id={id}
                            className={`modal__container-content ${modalCustomClass}`}
                            onClick={handleCloseModalClickOutsider}
                        >
                            <div
                                className={`${bgColorClass} ${modalAnimationClass} 
                ${position === 'centered' && 'modal__place-self-center'} 
                modal__layout-default-sizes ${modalClassSize}       
            `}
                                style={
                                    position === 'custom' ? positionModal : {}
                                }
                                onClick={handleClosePropagation}
                            >
                                {closeByIcon && (
                                    <div
                                        className="modal__close-btn"
                                        onClick={handleCloseModal}
                                    >
                                        <IconButtonSimple>
                                            <CloseIcon
                                                className={'close-icon'}
                                            />
                                        </IconButtonSimple>
                                    </div>
                                )}

                                {children}
                            </div>
                        </div>
                    </div>
                )}
            </>,
            document.querySelector('#root') as HTMLBodyElement
        );
    }
);

Modal.displayName = 'Modal';
