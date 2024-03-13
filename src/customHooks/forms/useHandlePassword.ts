import { useState } from 'react';

export const useHandlePassword = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => { setShowPassword((show) => !show); };

    return {
        showPassword,
        handleClickShowPassword
    };
};
