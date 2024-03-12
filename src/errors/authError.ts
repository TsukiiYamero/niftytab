import type { LoginWithEmailSupabaseResponse } from '@/models/auth.types';

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export const ValidationErrorName = 'ValidationError';

export const handleErrorsAuth = (error: unknown): LoginWithEmailSupabaseResponse => {
    if (error instanceof ValidationError) {
        return {
            error: { message: error.message }, data: { user: null, session: null }
        };
    } else if (error instanceof Error) {
        console.error('Unexpected error during sign-in:', error.message);
        return { error: { message: 'Unexpected error occurred' }, data: { user: null, session: null } };
    } else {
        console.error('Unknown error occurred:', error);
        return { error: { message: 'Unknown error occurred' }, data: { user: null, session: null } };
    }
};
