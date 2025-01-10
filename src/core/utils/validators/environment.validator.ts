export const environmentValidator = (
  variable: string,
  defaultValue: string | number
): string | number => {
  if (!process.env[variable]) {
    return defaultValue;
  }

  return process.env[variable]!;
};
