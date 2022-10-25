import { SupabaseCommonResponse } from '@/models';
import { useCallback, useEffect, useRef } from 'react';

type Props = {
    apiFunc: () => {
        apiCallFunc: () => Promise<SupabaseCommonResponse>,
        controller: AbortController
    }
}

export const useFetch = ({ apiFunc }: Props) => {
    const { current: { apiCallFunc, controller } } = useRef(apiFunc());

    const callApi = useCallback(async () => {
        let result: SupabaseCommonResponse = {
            data: [],
            error: null
        };

        try {
            result = await apiCallFunc();

            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error(error);
        }

        return result.data;
    }, [apiCallFunc]);

    useEffect(() => {
        return () => {
            console.log(controller);
            const abortApiCall = () => {
                controller?.abort();
            };
            abortApiCall();
        };
    }, [controller]);

    return {
        callApi
    };
};
