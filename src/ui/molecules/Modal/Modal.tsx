import './modal.css';
import { memo, MouseEvent, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { WrapperAnimation } from './WrapperAnimation';
import { IconButtonSimple } from '@/ui/atoms/Buttons';
import { CloseIcon } from '@/ui/atoms/icons';
import { ModalProvider } from './context/provider/ModalProvider';

export interface PropsModal {
    isOpen: boolean;
    onClose: () => void;
    closable?: boolean;
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
    displayLevel?: number;
}
/**
 * Have to be used with the custom hook useModal
 * Example: `const { isOpen, openModal, closeModal } = useModal();`
 */
export const Modal = memo(
    ({
        isOpen,
        children,
        closable = true,
        // prefer to receive a useCallback
        onClose,
        closeByClickOutside = true,
        closeByIcon = true,
        displayLevel = 1,
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
        const onCloseMemoized = useRef(onClose);

        const wrapperAnimationProps = {
            animationWrapper,
            ...posAnimationWrapper,
            animationBgColor
        };

        const positionModal = {
            top: `${topModal}px`,
            left: `${leftModal}px`
        };

        const closableModal = useCallback(
            () => {
                closable && onCloseMemoized.current?.();
            },
            [closable, onCloseMemoized]
        );

        const handleCloseModal = () => {
            closeByIcon && closableModal();
        };

        const handleCloseModalClickOutsider = () => {
            closeByClickOutside && closableModal();
        };

        const handleClosePropagation = (ev: MouseEvent<HTMLDivElement>) => {
            ev.stopPropagation();
        };

        return createPortal(
            <ModalProvider CloseFn={closableModal} isOpen closable>
                {isOpen && (
                    <div className="modal__container">
                        <WrapperAnimation displayLevel={displayLevel} {...wrapperAnimationProps} />

                        <div
                            id={id}
                            className={`modal__container-content ${modalCustomClass}`}
                            style={{ zIndex: `${displayLevel}05` }}
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
                                            <CloseIcon className={'close-icon'} />
                                        </IconButtonSimple>
                                    </div>
                                )}

                                {children}
                            </div>
                        </div>
                    </div>
                )}
            </ModalProvider>,
            document.querySelector('#root') as HTMLBodyElement
        );
    }
);

Modal.displayName = 'Modal';
