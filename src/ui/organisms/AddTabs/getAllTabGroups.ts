import { readGroups } from '@/services/tabs';

export const getAllTabGroups = async () => {
    const allGroups = await readGroups();

    if (allGroups.error) {
        console.error(allGroups.error?.message);
        return [];
    }

    return allGroups.data ?? [];
};
