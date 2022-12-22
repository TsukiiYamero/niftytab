/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabaseUrl } from '@/api/config';

/**
 * deprecated because i don't how to do it better
 * at the moment it show a new window modal with google sign in
 * so that could be bad for the users
 */
export const getIdentityGoogle = async () => {
    const redirectUri = chrome?.identity?.getRedirectURL('supabase-auth');
    console.log('redirectUri', redirectUri); // add this to your supabase auth redirect URLs list
    const options = {
        provider: 'google',
        redirect_to: redirectUri
    };
    const url = `${supabaseUrl}/auth/v1/authorize?provider=google&redirectto=${redirectUri}`;
    // console.log('supabase auth url in extensionSupabaseLogin -->', url);

    const authorizeResult = await new Promise((resolve, reject) => {
        chrome.identity.launchWebAuthFlow(
            {
                url,
                interactive: true
            },
            (callbackUrl) => {
                resolve(callbackUrl);
            }
        );
    });
    console.log(authorizeResult);
    if (!authorizeResult) {
        return { error: 'No authorizeResult' };
    }
    // const authResult = qs.parse(authorizeResult?.split('#')[1]);
    // const refreshToken = authResult?.refresh_token;
    // as documented here: https://supabase.com/docs/reference/javascript/auth-signin#sign-in-using-a-refresh-token-eg-in-react-native
    /* const { user, session, error } = await supabase.auth.signIn({
        refreshToken
    });
    console.log('user', user, 'session', session, 'error', error);
    if (error) {
        return { error };
    }
    return { user, session }; */
};
