/**
 * It returns an AbortController object.
 * @returns A new instance of the AbortController class.
 */
export const abortController = () => {
    const controller = new AbortController();
    return controller;
};
