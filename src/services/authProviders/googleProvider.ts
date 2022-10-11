import { supabase } from "@/api/config";
import { OAuthResponse } from "@supabase/supabase-js";

export const signInWithGoogle = async () => {

    let result: OAuthResponse = {
        data: {
            provider: 'google',
            url: ''
        },
        error: null
    };

    try {
        result = await supabase.auth.signInWithOAuth({
            provider: 'google',
        });
        console.log('aaaa', result)
    } catch (error) {
        console.error(error);
    }

    return result;
}
