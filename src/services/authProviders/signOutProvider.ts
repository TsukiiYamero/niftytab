import { supabase } from "@/api/config";
import { AuthError } from "@supabase/supabase-js";

export const signOut = async () => {
    let errorSignOut: { error: AuthError | null } = {
        error: null
    };

    try {
        errorSignOut = await supabase.auth.signOut();
        console.log(errorSignOut);
    } catch (error) {
        console.log(error);
    }

    return errorSignOut;
}
