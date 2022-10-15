import './App.css';
import { ThemeContext } from './theme/context/themeContext';
import { useSetInitialTheme } from './theme/hooks/useSetInitialTheme';
import MainPage from './pages/mainPage/MainPage';
import { AuthProvider } from './contexts/auth';

export const App = () => {
    const userTheme = useSetInitialTheme();

    return (
        <AuthProvider>
            <ThemeContext.Provider value={{ userTheme }}>
                <MainPage />
            </ThemeContext.Provider>
        </AuthProvider>
    );
};

export default App;
