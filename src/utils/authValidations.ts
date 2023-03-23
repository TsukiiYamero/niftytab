// email validation value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
export const PatternEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
// nice pattern at least 8 characters 1 number & 1 letter and is not case sensitive could be a or A
// eslint-disable-next-line prefer-regex-literals
export const PatternPassword = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/g);
