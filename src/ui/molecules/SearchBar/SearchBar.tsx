import { ChangeEvent, useEffect, useState, useCallback } from 'react';
import { useGetTabsContext, useTabsDispatch } from '@/contexts/tabs/hooks';
import { TabSectionFilter, TabsActions } from '@/contexts/tabs';
import { CancelRounded } from '@mui/icons-material';
import { FormControl, IconButton, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { useDebounce } from '@/customHooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import { SearchPath } from '@/utils';
import './search_bar.css';

const SearchBar = () => {
    const { isFiltering, tabSection } = useGetTabsContext();
    const dispatch = useTabsDispatch();
    const navigateTo = useNavigate();
    const [searchWord, setSearchWord] = useState('');
    const debouncedValue: string = useDebounce({ value: searchWord, delay: 430 });

    const changeSearchSection = (event: SelectChangeEvent) => {
        const tabsSection = event.target.value as TabSectionFilter;
        dispatch({ type: TabsActions.changeTabsSection, payload: tabsSection });
        setSearchWord('');
        resetSearch(false);
        navigateTo(tabsSection);
    };

    /**
     * Active and Filter tabs by the type of storage
     */
    const setSearchState = useCallback((query: string) => {
        dispatch({ type: TabsActions.isFiltering, payload: true });
        dispatch({ type: TabsActions.filterQuery, payload: query });
        navigateTo(`/${tabSection}/${SearchPath}`);
    }, [dispatch, navigateTo, tabSection]);

    useEffect(() => {
        if (debouncedValue.trim().length > 0 && searchWord.trim().length > 0)
            setSearchState(debouncedValue);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedValue, setSearchState]);

    const resetSearch = (withNavigate = true) => {
        dispatch({ type: TabsActions.isFiltering, payload: false });
        dispatch({ type: TabsActions.filterQuery, payload: '' });

        if (withNavigate) navigateTo(tabSection);
    };

    const onSearch = (ev: ChangeEvent<HTMLInputElement>) => {
        setSearchWord(ev.target.value);

        if (ev.target.value.trim().length === 0)
            resetSearch();
    };

    const cancelSearch = () => {
        setSearchWord('');
        resetSearch();
    };

    const placeholderSearch = tabSection === TabSectionFilter.tabs ? 'Cheesecake recipe' : 'Work Session';

    return (
        <>
            <FormControl sx={{ minWidth: 120 }} size="small">
                <Select
                    value={tabSection}
                    onChange={changeSearchSection}
                    displayEmpty
                >
                    <MenuItem value={TabSectionFilter.tabs}>Tabs</MenuItem>
                    <MenuItem value={TabSectionFilter.sessions}>Sessions</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined" size='small'>
                <OutlinedInput
                    id="outlined-adornment-SearchBar"
                    value={searchWord}
                    onChange={onSearch}
                    placeholder={placeholderSearch}
                    endAdornment={isFiltering
                        ? <IconButton onClick={cancelSearch} className='btn-cancel-search' color="primary" aria-label="Cancel search" component="label">
                            <CancelRounded />
                        </ IconButton>
                        : null}
                />
            </FormControl>
        </>
    );
};

export default SearchBar;
