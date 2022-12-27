import { useSnackbar } from '@/contexts/snackbar/hooks';
import { SupabaseCommonResponse } from '@/models';
import { abortController } from '@/utils/abortController';
import { ERROR_MESSAGE } from '@/utils/commonMsg';
import { useCallback, useEffect, useRef } from 'react';

type fetchApi = (controller: AbortController, payload?: any) => any;

/**
 * Custom hook that returns a function to call the fetch (callback that receive the fetch func)
 * @returns callApi `function`.
 */
export const useFetchWithCallback = () => {
    const refAbortController = useRef<AbortController>();
    const showSnackbar = useSnackbar();

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
                showSnackbar(ERROR_MESSAGE, 'error');
                console.error(result.error.message);
            }
        } catch (error) {
            showSnackbar(`Ops.. something went wrong, ${error} `, 'error');
        }

        return result;
    }, [showSnackbar]);

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
