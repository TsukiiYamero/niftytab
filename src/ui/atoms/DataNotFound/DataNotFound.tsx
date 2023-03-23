// import ImgAstro from '@/assets/img/astronaut.png';
import { useRive } from '@rive-app/react-canvas';

type Props = {
    msg?: string
}

export const DataNotFound = ({ msg = 'Ops... No results found' }: Props) => {
    const { RiveComponent } = useRive({
        src: '/src/assets/rive/not-found/cat_no_results_found.riv',
        autoplay: true,
        animations: 'State Machine 1'
    });

    return (
        <div className='tabs-not-found-results'>
            {/* https://www.mothershipcorp.com/images/slider-6.png */}
            {/* <img src={ImgAstro} alt='img of astronaut' /> */}

            {/* credits for webksherrish at https://rive.app/community/4597-9318-no-results-found/ */}
            <div>
                <RiveComponent />
            </div>
            <span>{msg}</span>
        </div>
    );
};
