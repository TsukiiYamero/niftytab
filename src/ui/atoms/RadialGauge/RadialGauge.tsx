const TRACK_WIDTH_PX = 7;
const VIEW_BOX_SIZE_PX = 100;

/* 2 */
const cxy = VIEW_BOX_SIZE_PX * 0.5;

export const RadialGauge = ({ value, trackSizeDeg = 80 }: { value: number, trackSizeDeg: number }) => {
    const viewBox = `0 0 ${VIEW_BOX_SIZE_PX} ${VIEW_BOX_SIZE_PX}`;
    const radius = VIEW_BOX_SIZE_PX / 2 - TRACK_WIDTH_PX / 2;
    const circumference = 2 * Math.PI * radius;

    const trackTransform = `rotate(${-(trackSizeDeg / 2) - 90
        }, ${cxy}, ${cxy})`;
    const dasharray = circumference;
    const trackFillPercentage = trackSizeDeg / 360;
    const trackDashoffset = circumference * (1 - trackFillPercentage);

    /* 2 */
    const valuePercentage = (value / 100) * trackFillPercentage;
    const valueDashoffset = circumference * (1 - valuePercentage);

    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
            <circle
                fill="none"
                cx="50%"
                cy="50%"
                r={radius}
                stroke="white"
                strokeLinecap="round"
                strokeDasharray={dasharray}
                strokeDashoffset={trackDashoffset}
                strokeWidth={TRACK_WIDTH_PX}
                transform={trackTransform}
            />

            <circle
                fill="none"
                strokeLinecap="round"
                cx="50%"
                cy="50%"
                r={radius}
                stroke={'#74DFA2'}
                strokeDasharray={dasharray}
                strokeDashoffset={valueDashoffset}
                strokeWidth={TRACK_WIDTH_PX}
                transform={trackTransform}
            />
        </svg>
    );
};
