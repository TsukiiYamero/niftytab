import type { User, Session, WeakPassword } from '@supabase/supabase-js';

export interface LoginWithEmailSupabaseResponse {
    data: {
        user: User | null,
        session: Session | null,
        weakPassword?: WeakPassword | null
    },
    error: null | {
        message: string
    }
}
