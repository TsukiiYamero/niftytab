import { useGetSnackbarDispatchContext } from '@/contexts/snackbar/hooks';
import { SnackbarActions } from '@/contexts/snackbar/snackbar.types';
import { SupabaseCommonResponse } from '@/models';
import { abortController } from '@/utils/abortController';
import { useCallback, useEffect, useRef } from 'react';

type fetchApi = (controller: AbortController, payload?: any) => any;

/**
 * Custom hook that returns a function to call the fetch (callback that receive the fetch func)
 * @returns callApi `function`.
 */
export const useFetchWithCallback = () => {
    const refAbortController = useRef<AbortController>();
    const dispatch = useGetSnackbarDispatchContext();

    // func that make the fetch call
    const callApi = useCallback(async (fetchFunc: fetchApi, payload?: any): Promise<SupabaseCommonResponse> => {
        refAbortController.current = abortController();

        let result: SupabaseCommonResponse = {
            data: [],
            error: null
        };

        try {
            result = await fetchFunc(refAbortController.current, payload || null);

            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            dispatch({
                type: SnackbarActions.setSnackbar,
                payload: {
                    opened: true,
                    message: `Ops.. something went wrong, ${error} `,
                    type: 'error'
                }
            });
        }

        return result;
    }, [dispatch]);

    useEffect(() => {
        return () => {
            const abortApiCall = () => {
                refAbortController.current?.abort();
            };
            abortApiCall();
        };
    }, [callApi]);

    return { callApi };
};
