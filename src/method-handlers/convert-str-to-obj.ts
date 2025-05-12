export const convertStrToObj = (str: string): unknown | null => {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};
