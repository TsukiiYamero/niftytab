import { IconButtonSimple } from '@/ui/atoms/Buttons'
import { BellIcon } from '@/ui/atoms/icons'
import { StandardIconsSize } from '@/utils/icons/iconsPropertys'


const Notification = () => {
    return (
        <IconButtonSimple>
            <BellIcon style={StandardIconsSize} color={'var(--main-text-color)'} />
        </IconButtonSimple>
    )
}

export default Notification