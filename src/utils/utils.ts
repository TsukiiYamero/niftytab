export const moveItem = <T>(arr: T[] = [], from = 0, to = 0) => {
    if (from === to || arr.length === 0) return arr;

    const newArr = structuredClone(arr);
    const itemRemoved = newArr.splice(from, 1);
    newArr.splice(to, 0, itemRemoved[0]);

    return newArr;
};
