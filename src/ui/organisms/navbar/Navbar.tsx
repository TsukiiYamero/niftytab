import { ToggleTheme } from "@/theme/components/ToggleTheme/ToggleTheme"
import SearchBar from "@/ui/molecules/SearchBar/SearchBar"
import { UserIcon } from "../../atoms/icons/userIcon/userIcon.styles"
import { Account } from "../Account"
import Notification from "../Notifications/Notification"
import { Nav } from "./styledComponents/navbar.styled"
import { NavbarActionWrapper } from "./styledComponents/navbarActionsWrapper.styled"

type Props = {}

const Navbar = (props: Props) => {
    return (
        <Nav>
            <SearchBar />

            <NavbarActionWrapper>
                <ToggleTheme />
                <Notification />
                <Account />
            </NavbarActionWrapper>
        </Nav>
    )
}

export default Navbar