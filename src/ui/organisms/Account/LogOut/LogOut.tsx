import { signOut } from '@/services/auth/auth'
import { CustomButton, StandardButton } from '@/ui/atoms/Buttons'
import { MouseEvent } from 'react'

export const LogOut = () => {

    const onLogout = async (ev: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        await signOut();
    }

    return (
        <StandardButton buttonStyle='btn-primary' text='Logout' onClick={onLogout} />
    )
}
