import BellIcon from '@/ui/atoms/BellIcon/BellIcon'
import { IconButton } from '@/ui/atoms/IconButtonStyled/IconButton.styled'


type Props = {}

const bellSizeStyle = {
    width: 'var(--icons-size-primary)',
    height: 'var(--icons-size-primary)'
}

const Notification = (props: Props) => {
    return (
        <IconButton>
            <BellIcon style={bellSizeStyle} color={'var(--main-text-color)'} />
        </IconButton>
    )
}

export default Notification