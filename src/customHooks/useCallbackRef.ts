import { useLayoutEffect, useRef } from 'react';

/**
 * Save the reference for functions or some things like that
 * @param callback
 * @returns the current of the useRef saved, so its possible to be null
 * remember to use `?.`
 */
export const useCallbackRef = (callback: any) => {
    const callbackRef = useRef(callback);

    useLayoutEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    return callbackRef;
};
