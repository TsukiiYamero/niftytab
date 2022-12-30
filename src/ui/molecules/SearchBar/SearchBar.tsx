/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useEffect, useState, useCallback } from 'react';
import { SearchBarWrapper } from './searchBarWrapper.styled';
import { SearchInput } from './SearchInput.styled';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { TabSectionFilter, TabsActions, TabsStoredType } from '@/contexts/tabs';
import { filterTabsByTitleOrUrl } from '@/utils/tabs';
import { CancelRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import './search_bar.css';
import { useDebounce } from '@/customHooks/useDebounce';
import { filterSession } from '@/utils/sessions';
import { NiftyTab, SessionNiftyCount } from '@/models';

const SearchBar = () => {
    const { isFiltering, saved, sessions, local, typeOfStore, tabSection } = useGetTabsContext();
    const dispatch = useTabsDispatch();
    const [searchWord, setSearchWord] = useState('');
    const debouncedValue = useDebounce({ value: searchWord, delay: 430 });

    /**
     * Active and Filter tabs by the type of storage
     */
    const setFilterState = useCallback(() => {
        dispatch({ type: TabsActions.isFiltering, payload: true });

        const tabsToFilter = typeOfStore === TabsStoredType.local ? local : saved;

        let listFiltered: NiftyTab[] | SessionNiftyCount[] = [];

        switch (tabSection) {
            case TabSectionFilter.tabs:
                listFiltered = filterTabsByTitleOrUrl(tabsToFilter, debouncedValue ?? '');
                break;
            case TabSectionFilter.sessions:
                listFiltered = filterSession(sessions, debouncedValue ?? '');
                break;

            default: listFiltered = [];
                break;
        }

        dispatch({ type: TabsActions.updatedFiltered, payload: listFiltered });
    }, [dispatch, typeOfStore, local, saved, tabSection, debouncedValue, sessions]);

    useEffect(() => {
        if (debouncedValue.trim().length > 0)
            setFilterState();
    }, [debouncedValue, setFilterState]);

    const cancelFilter = () => {
        dispatch({ type: TabsActions.updatedFiltered, payload: [] });
        dispatch({ type: TabsActions.isFiltering, payload: false });
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
