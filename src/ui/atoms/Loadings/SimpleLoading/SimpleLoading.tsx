import { useRive } from '@rive-app/react-canvas';

// import RIVER_LOADER from '@/assets/rive/loaders/simple-loader.riv';

export const SimpleLoading = () => {
    const { RiveComponent } = useRive({
        src: '/src/assets/rive/loaders/flame-loader.riv',
        autoplay: true
    });

    return (
        <>
            {/* credits for @JcToon and DC at https://rive.app/@dc/ */}
            <RiveComponent />
        </>
    );
};
