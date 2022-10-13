import { supabase } from '@/api/config';

/**
 *
 * {
        email: "new@email.com",
        password: "new-password",
        data: { hello: 'world' }
      }
 * @param data
 * @returns
 */

export const udateProfile = async (data: any) => {
    try {
        await supabase.auth.updateUser(data);
    } catch (error) {
        console.error(error);
    }
};
