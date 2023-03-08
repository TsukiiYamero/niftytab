import { ChangeEvent, useEffect, useState, useCallback } from 'react';
import { SearchBarWrapper } from './searchBarWrapper.styled';
import { SearchInput } from './SearchInput.styled';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { TabsActions } from '@/contexts/tabs';
import { CancelRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useDebounce } from '@/customHooks/useDebounce';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchPath } from '@/utils';
import './search_bar.css';

const SearchBar = () => {
    const { isFiltering, filterSection } = useGetTabsContext();
    const dispatch = useTabsDispatch();
    const navigateTo = useNavigate();
    const [searchWord, setSearchWord] = useState('');
    const debouncedValue: string = useDebounce({ value: searchWord, delay: 430 });
    const location = useLocation();

    useEffect(() => {
        // Google Analytics
        console.log('loc', location);
    }, [location]);

    /**
     * Active and Filter tabs by the type of storage
     */
    const setFilterState = useCallback((query: string) => {
        dispatch({ type: TabsActions.isFiltering, payload: true });
        dispatch({ type: TabsActions.filterQuery, payload: query });
        navigateTo(`/${SearchPath}/${filterSection}`);
    }, [dispatch, navigateTo, filterSection]);

    useEffect(() => {
        if (debouncedValue.trim().length > 0 && searchWord.trim().length > 0)
            setFilterState(debouncedValue);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, setFilterState]);

    const cancelFilter = () => {
        dispatch({ type: TabsActions.isFiltering, payload: false });
        dispatch({ type: TabsActions.filterQuery, payload: '' });
        navigateTo('/tabs');
    };

    const onSearch = (ev: ChangeEvent<HTMLInputElement>) => {
        setSearchWord(ev.target.value);

        if (ev.target.value.trim().length === 0)
            cancelFilter();
    };

    const cancelSearch = () => {
        setSearchWord('');
        cancelFilter();
    };

    return (
        <SearchBarWrapper>
            <SearchInput
                value={searchWord}
                type="text"
                onChange={onSearch}
                placeholder="Search tab, group, session"
            />

            {isFiltering
                ? <IconButton onClick={cancelSearch} className='btn-cancel-search' color="primary" aria-label="Cancel search" component="label">
                    <CancelRounded />
                </ IconButton>
                : null}

        </SearchBarWrapper>
    );
};

export default SearchBar;
