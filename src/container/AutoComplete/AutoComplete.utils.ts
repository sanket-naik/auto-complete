/* replaces the special characters */
export const replaceSpecialChar = (str: string) => {
  return str.replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?]/g, "");
};
