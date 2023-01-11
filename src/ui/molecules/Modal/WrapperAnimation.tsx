import { useEffect, useState } from 'react';
import { CircleSvg } from './modal-svg-icons/CircleSvg';

interface Props {
    animationWrapper: boolean;
    top: number;
    left: number;
    animationBgColor: string;
    displayLevel: number;
}

export const WrapperAnimation = ({
    animationWrapper,
    top,
    left,
    animationBgColor,
    displayLevel
}: Props) => {
    const [isShown, setIsShown] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsShown(true), 5);
    }, []);

    return (
        <>
            {animationWrapper && (
                <div
                    className={'modal__wrapper'}
                    style={{ zIndex: isShown ? `${displayLevel}00` : '-1' }}
                >
                    <div
                        className="modal__iconposition-wrapper"
                        style={{
                            top: `${top}px`,
                            left: `${left}px`
                        }}
                    >
                        <CircleSvg
                            fill={animationBgColor}
                            className={`modal__circle-svg
                                      ${isShown && 'modal__circle-transform'}
                                      `}
                        />
                    </div>
                </div>
            )}
        </>
    );
};
