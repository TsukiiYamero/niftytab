export const getMemoryInfo = async () => {
    return await chrome?.system?.memory?.getInfo();
};
