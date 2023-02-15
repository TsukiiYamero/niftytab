import { useSnackbar } from '@/contexts/snackbar/hooks';
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
    const showSnackbar = useSnackbar();

    // func that make the fetch call
    const callApi = useCallback(async <T>(fetchFunc: fetchApi, payload?: T): Promise<SupabaseCommonResponse> => {
        refAbortController.current = abortController();

        let result: SupabaseCommonResponse = {
            data: [],
            error: null
        };

        try {
            result = await fetchFunc(refAbortController.current, payload);

            if (result.error) {
                showSnackbar('Ops... something went wrong.', 'error');
                console.error(result.error.message);
            }
        } catch (error) {
            showSnackbar(`Ops.. something went wrong, ${error} `, 'error');
            console.error(error);
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
