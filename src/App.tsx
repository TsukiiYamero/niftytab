import './App.css';
import { ThemeContext } from './theme/context/themeContext';
import { useSetInitialTheme } from './theme/hooks/useSetInitialTheme';
import MainPage from './pages/mainPage/MainPage';
import { AuthProvider } from './contexts/auth';
import { TabsProvider } from './contexts/tabs';

export const App = () => {
    const userTheme = useSetInitialTheme();

    return (
        <AuthProvider>
            <ThemeContext.Provider value={{ userTheme }}>
                <TabsProvider>
                    <MainPage />
                </TabsProvider>
            </ThemeContext.Provider>
        </AuthProvider>
    );
};

export default App;
