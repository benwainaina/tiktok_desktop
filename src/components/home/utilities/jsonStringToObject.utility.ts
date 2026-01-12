export const jsonStringToObjectUtility = (arg: any) => {
  try {
    return JSON.parse(arg);
  } catch (error) {}
};
