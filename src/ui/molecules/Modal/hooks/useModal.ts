import { type MouseEvent, useCallback, useState } from 'react';

interface ModalOpen {
    topModal?: number;
    leftModal?: number;
    event?: MouseEvent<HTMLButtonElement | HTMLAnchorElement>;
}

export const useModal = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState);

    const [positionModal, setPositionModal] = useState({
        topModal: 0,
        leftModal: 0
    });

    const [positionAnimation, setPositionsAnimation] = useState({
        top: 0,
        left: 0
    });

    const openModal = useCallback(({
        topModal = 0,
        leftModal = 0,
        event
    }: ModalOpen = {}) => {
        setIsOpen(true);
        setPositionModal({ topModal, leftModal });

        if (event) {
            const { clientX, clientY } = event;
            const animations = {
                top: clientY,
                left: clientX
            };
            setPositionsAnimation(animations);
        }
    }, []);

    const closeModal = useCallback(
        () => {
            setIsOpen(false);
        },
        []
    );

    return {
        isOpen,
        openModal,
        closeModal,
        positionAnimation,
        positionModal
    } as const;
};
