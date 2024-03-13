import './modal.css';
import { type MouseEvent, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { WrapperAnimation } from './WrapperAnimation';
import { ModalProvider } from './context/provider/ModalProvider';

const wrapperAnimationProps = {
    animationBgColor: 'rgba(18, 21, 25, 0.5)',
    top: 0,
    left: 0
};

export interface PropsModal {
    isOpen: boolean;
    onClose: () => void;
    closable?: boolean;
    closeByClickOutside?: boolean;
    closeByIcon?: boolean;
    className?: string;
    children?: any;
    animationWrapper?: boolean;
    titleIconElement?: any;
    // for close wherever
    id?: string;
    displayLevel?: number;
}
/**
 * Have to be used with the custom hook useModal
 * Example: `const { isOpen, openModal, closeModal } = useModal();`
 */
export const Modal = ({
    isOpen,
    children,
    closable = true,
    onClose,
    closeByClickOutside = true,
    closeByIcon = true,
    displayLevel = 1,
    animationWrapper = true,
    className = '',
    id = ''
}: PropsModal) => {
    const onCloseMemoized = useRef(onClose);

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
                    <WrapperAnimation displayLevel={displayLevel} animationWrapper={animationWrapper} {...wrapperAnimationProps} />

                    <div
                        id={id}
                        className={'modal__container-content'}
                        style={{ zIndex: `${displayLevel}05` }}
                        onClick={handleCloseModalClickOutsider}
                    >
                        <div
                            /* be careful with the space */
                            className={
                                `modal__default-padding
                                 modal__bg-color
                                 modal__place-self-center`
                            }
                            onClick={handleClosePropagation}
                        >
                            {closeByIcon && <IconSection handleCloseModal={handleCloseModal} />}

                            {children}
                        </div>
                    </div>
                </div>
            )}
        </ModalProvider>,
        document.querySelector('#root')!
    );
};

Modal.displayName = 'CustomModal';

const IconSection = ({ handleCloseModal }: { handleCloseModal: () => void }) => (
    <div
        className="modal__close-btn"
        onClick={handleCloseModal}
    >
        <button className='flex border-0 outline-0 p-0 bg-transparent cursor-pointer'>
            {/* <CloseIcon className={'close-icon'} /> */}
            X
        </button>
    </div>
);
