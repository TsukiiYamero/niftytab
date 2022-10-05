import { IconBaseProps, IconType } from 'react-icons'
import { BiBell } from 'react-icons/bi'


const BellIcon = (props: IconBaseProps) => {
    console.log(props)
    return (<><BiBell {...props} /></>)
}

export default BellIcon