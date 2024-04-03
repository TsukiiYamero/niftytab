type Props = {
    msg?: string
}

export const DataNotFound = ({ msg = 'Ops... No results found' }: Props) => {
    return (
        <div className='tabs-not-found-results'>
            {/* https://www.mothershipcorp.com/images/slider-6.png */}
            {/* <img src={ImgAstro} alt='img of astronaut' /> */}

            {/* credits for webksherrish at https://rive.app/community/4597-9318-no-results-found/ */}
            <div>
                <p>LOADING...</p>
            </div>
            <span>{msg}</span>
        </div>
    );
};
