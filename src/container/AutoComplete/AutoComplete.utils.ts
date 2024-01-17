/* replaces the special characters */
export const replaceSpecialChar = (str: string) => {
  // eslint-disable-next-line no-useless-escape
  return str.replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?]/g, "");
};
