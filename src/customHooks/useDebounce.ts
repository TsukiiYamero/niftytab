import { useEffect, useState } from 'react';

type Props = {
    value: any;
    delay?: number;
};

export const useDebounce = ({ value, delay = 380 }: Props) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(timeoutId);
    }, [value, delay]);

    return debounceValue;
};
