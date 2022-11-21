import { SlOptionsVertical } from 'react-icons/sl';

type Props = {
    size: string;
    color?: string;
};

const OptionsVertical = ({ size, color }: Props) => {
    return <SlOptionsVertical size={size} cursor={'pointer'} color={color} />;
};

export default OptionsVertical;
