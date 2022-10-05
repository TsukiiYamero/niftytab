
import { BiSearchAlt } from 'react-icons/bi';

type Props = {
    size: string;
    color?: string;
}

const SearchIcon = ({ size,color }: Props) => {
    return <BiSearchAlt size={ size } cursor={'pointer'} color={color} />;
}

export default SearchIcon