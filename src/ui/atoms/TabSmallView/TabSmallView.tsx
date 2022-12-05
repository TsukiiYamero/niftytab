import './tabSmallView.css';
import { ReactNode } from 'react';

type Props = {
    title: string;
    imgSrc: string;
    urlText: string;
    children?: ReactNode;
};

export const TabSmallView = ({ title, imgSrc, urlText, children }: Props) => {
    return (
        <div className="tab-Small-View__container"
            title={`${title} - ${urlText}`}
        >
            <img src={imgSrc} alt={'img of website not found'} />

            <span className={'overflow-ellipsis'}>{title}</span>

            {children ?? null}
        </div>
    );
};
