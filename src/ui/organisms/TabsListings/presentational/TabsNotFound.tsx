/* eslint-disable @typescript-eslint/no-unused-vars */
import ImgAstro from '@/assets/img/astronaut.png';

type Props = {
    msg?: string
}

export const TabsNotFound = ({ msg = 'Ops... No results found' }: Props) => {
    return (
        <div className='tabs-not-found-results'>
            {/* recuperada de: https://www.mothershipcorp.com/images/slider-6.png */}
            <img src={ImgAstro} alt='img of astronaut' />
            <span>{msg}</span>
        </div>
    );
};
