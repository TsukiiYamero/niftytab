/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeEvent, useEffect, useState, useCallback } from 'react';
import { SearchBarWrapper } from './searchBarWrapper.styled';
import { SearchInput } from './SearchInput.styled';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { TabsActions, TabsStoredType } from '@/contexts/tabs';
import { filterTabsByTitleOrUrl } from '@/utils/tabs';
import { CancelRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import './search_bar.css';
import { useDebounce } from '@/customHooks/useDebounce';

const SearchBar = () => {
    const { isFiltering, saved, local, typeOfStore } = useGetTabsContext();
    const dispatch = useTabsDispatch();
    const [searchWord, setSearchWord] = useState('');
    const debouncedValue = useDebounce({ value: searchWord, delay: 430 });

    /**
     * Active and Filter tabs by the type of storage
     */
    const onFiltering = useCallback(() => {
        dispatch({ type: TabsActions.isFiltering, payload: true });

        const tabsToFilter = typeOfStore === TabsStoredType.local ? local : saved;
        const tabsFiltered = filterTabsByTitleOrUrl(tabsToFilter, debouncedValue ?? '');

        dispatch({ type: TabsActions.updatedFiltered, payload: tabsFiltered });
    }, [dispatch, typeOfStore, local, saved, debouncedValue]);

    useEffect(() => {
        if (debouncedValue.trim().length > 0)
            onFiltering();
    }, [debouncedValue, onFiltering]);

    const onSearch = (ev: ChangeEvent<HTMLInputElement>) => {
        setSearchWord(ev.target.value);

        if (ev.target.value.trim().length === 0) {
            dispatch({ type: TabsActions.updatedFiltered, payload: [] });
            dispatch({ type: TabsActions.isFiltering, payload: false });
        }
    };

    const cancelFilter = () => {
        setSearchWord('');

        dispatch({ type: TabsActions.updatedFiltered, payload: [] });
        dispatch({ type: TabsActions.isFiltering, payload: false });
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
                ? <IconButton onClick={cancelFilter} className='btn-cancel-search' color="primary" aria-label="Cancel search" component="label">
                    <CancelRounded />
                </ IconButton>
                : null}

        </SearchBarWrapper>
    );
};

export default SearchBar;
