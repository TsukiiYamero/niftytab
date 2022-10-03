import { createContext } from "react";
import { Themes } from "../theme.types";

type ThemeContext = {
    userTheme: Themes
}

export const ThemeContext = createContext<ThemeContext>({ userTheme: Themes.dark })
