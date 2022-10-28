import { SupabaseCommonResponse } from '@/models';
import { abortController } from '@/utils/abortController';
import { useCallback, useEffect, useRef } from 'react';

type CallApi = {
    fetchFunc: (controller: AbortController) => Promise<SupabaseCommonResponse>
}

/**
 * Custom hook that returns a function to call a callback (a fetch function) and returns the data
 * @returns callApi `function`.
 */
export const useFetchInSupabase = () => {
    const refAbortController = useRef<AbortController>();

    const callApi = useCallback(async ({ fetchFunc }: CallApi) => {
        refAbortController.current = abortController();

        let result: SupabaseCommonResponse = {
            data: [],
            error: null
        };
        try {
            result = await fetchFunc(refAbortController.current);

            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error(error);
        }

        return result.data;
    }, []);

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
