
import { useRef } from "react"
import SearchIcon from "@/ui/atoms/icons/SearchIcon/SearchIcon"
import { IconButtonSimple } from "@/ui/atoms/Buttons"
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
            <IconButtonSimple onClick={onClickSearchIcon}>
                <SearchIcon size={"24px"} color={'var(--border-color-secondary)'} />
            </IconButtonSimple>
        </SearchBarWrapper >
    )
}

export default SearchBar