import './tabSmallView.css';
import { CloseIcon } from '@/ui/atoms/icons';
import { IconButtonSimple } from '@/ui/atoms/Buttons';
import { createRipple } from '@/utils';

type Props = {
    title: string;
    imgSrc: string;
    urlText: string;
};

export const TabSmallView = ({ title, imgSrc, urlText }: Props) => {
    return (
        <div
            onClick={(ev) => createRipple(ev)}
            className="tab-Small-View__container"
            title={`${title} - ${urlText}`}
        >
            <img src={imgSrc} alt={'img of website not found'} />

            <span className={'overflow-ellipsis'}>{title}</span>

            <IconButtonSimple className="close-btn-simple">
                <CloseIcon size={'18px'} />
            </IconButtonSimple>
        </div>
    );
};
