import { useChangeTheme } from '@/theme/hooks/useChangeTheme';
import './toggleTheme.css';

/**
 * Component for toggle the theme,
 * themes supported Dark & Light.
 */
export const ToggleTheme = () => {
    const { changeTheme, darkTheme } = useChangeTheme();

    return (
        <label className="switch">
            <input
                className="checkbox"
                type="checkbox"
                checked={darkTheme}
                onChange={(e) => changeTheme(e.target.checked)}
            />
            <span className="slider round"></span>
        </label>
    );
};
