import { Box } from '@mui/material';
import { useRive } from '@rive-app/react-canvas';
import LoaderFile from '@/assets/rive/loaders/flame-loader.riv?url';

export const SimpleLoading = () => {
    const { RiveComponent } = useRive({
        src: LoaderFile,
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
