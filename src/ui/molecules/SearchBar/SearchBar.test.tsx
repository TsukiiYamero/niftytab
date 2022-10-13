import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar Test', () => {
    afterEach(cleanup);

    it('should Render SearchBar', () => {
        render(<SearchBar />);
    });

    it('should exist and be able to type in input', () => {
        render(<SearchBar />);

        // const searchInput = queryByPlaceholderText('Search tab, group, session')
        const searchInput: HTMLInputElement = screen.getByPlaceholderText(
            'Search tab, group, session'
        );

        fireEvent.change(searchInput, {
            target: {
                value: 'Anime'
            }
        });
        expect(searchInput.value).toBe('Anime');
    });
});
