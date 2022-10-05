import { createContext } from "react";

type TSearchValueContext = {
    searchValue: string;
}

export const SearchValueContext = createContext<TSearchValueContext>({ searchValue: '' });
