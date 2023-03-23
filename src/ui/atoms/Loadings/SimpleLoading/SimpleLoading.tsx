import { Box } from '@mui/material';
import { useRive } from '@rive-app/react-canvas';

// import RIVER_LOADER from '@/assets/rive/loaders/simple-loader.riv';

export const SimpleLoading = () => {
    const { RiveComponent } = useRive({
        src: '/src/assets/rive/loaders/flame-loader.riv',
        autoplay: true
    });

    return (
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'grid',
            placeContent: 'center'
        }}>
            <Box sx={{
                width: '324px',
                height: '180px'
            }}>
                {/* credits for @JcToon and DC at https://rive.app/@dc/ */}
                <RiveComponent />
            </Box>
        </Box >
    );
};
