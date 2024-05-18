export const moveItem = <T>(arr: T[] = [], from = 0, to = 0) => {
    if (from === to || arr.length === 0) return arr;

    const newArr = structuredClone(arr);
    const itemRemoved = newArr.splice(from, 1);
    newArr.splice(to, 0, itemRemoved[0]);

    return newArr;
};

/* PATHS */
export const HomeRoute = '/';
export const SuspendRoute = 'suspend';
export const SaveTabsRoute = 'save';
export const ShowTabsRoute = 'showTabs';

export const successColorIfTrue = (condition: boolean) => {
    return condition ? 'text-[#74DFA2]' : '';
};

export const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
export const isValidUrl = (url: string) => {
    return urlRegex.test(url);
};
