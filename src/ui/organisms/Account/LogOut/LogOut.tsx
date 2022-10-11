import { CustomButton, StandardButton } from '@/ui/atoms/Buttons'
import { MouseEvent } from 'react'

export const LogOut = () => {

    const onLogout = (ev: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        console.log(ev);
    }

    return (
        <StandardButton buttonStyle='btn-primary' text='Logout' onClick={onLogout} />
    )
}
