/* eslint-disable @typescript-eslint/no-unused-vars */
import ImgAstro from '@/assets/img/astronaut.png';

type Props = {
    msg?: string
}

export const TabsNotFound = ({ msg = 'Ops... No results found' }: Props) => {
    return (
        <div className='tabs-not-found-results'>
            <img src={ImgAstro} alt="" />
            <span>{msg}</span>
        </div>
    );
};
