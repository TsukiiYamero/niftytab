import { ToggleTheme } from "@/theme/components/ToggleTheme/ToggleTheme"
import SearchBar from "@/ui/molecules/SearchBar/SearchBar"
import { Nav } from "./styledComponents/navbar.styled"
import { UserIcon } from "../../atoms/userIcon/userIcon.styles"
import { NavbarActionWrapper } from "./styledComponents/navbarActionsWrapper.styled"
import Notification from "../notifications/Notification"

type Props = {}

const Navbar = (props: Props) => {
    return (
        <Nav>
            <SearchBar />

            <NavbarActionWrapper>
                <ToggleTheme />
                <Notification />
                <UserIcon></UserIcon>
            </NavbarActionWrapper>
        </Nav>
    )
}

export default Navbar