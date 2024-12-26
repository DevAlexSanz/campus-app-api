export const environmentValidator = (
  variable: string,
  defaultValue: number | string
): number | string => {
  if (!process.env[variable]) {
    return defaultValue;
  }

  return process.env[variable]!;
};
