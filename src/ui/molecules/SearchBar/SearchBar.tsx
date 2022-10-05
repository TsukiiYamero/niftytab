import { IconButton } from "@/ui/atoms/IconButtonStyled/IconButton.styled"
import SearchIcon from "@/ui/atoms/searchIcon/SearchIcon"
import { useRef } from "react"
import { SearchBarWrapper } from "./searchBarWrapper.styled"
import { SearchInput } from "./SearchInput.styled"

type Props = {}

const SearchBar = (props: Props) => {

    const ref = useRef<HTMLInputElement>(null);

    const onClickSearchIcon = () => {
        ref.current && ref.current.focus();
    }

    return (
        <SearchBarWrapper>
            <SearchInput ref={ref} type="text" placeholder="Search tab, group, session" />
            <IconButton onClick={onClickSearchIcon}>
                <SearchIcon size={"24px"} color={'var(--border-color-secondary)'} />
            </IconButton>
        </SearchBarWrapper >
    )
}

export default SearchBar