import './App.css';
import { ThemeContext } from './theme/context/themeContext';
import { useSetInitialTheme } from './theme/hooks/useSetInitialTheme';
import MainPage from './pages/mainPage/MainPage';

export const App = () => {
    const userTheme = useSetInitialTheme();

    return (
        <ThemeContext.Provider value={{ userTheme }}>
            <MainPage />
        </ThemeContext.Provider>
    );
};

export default App;
