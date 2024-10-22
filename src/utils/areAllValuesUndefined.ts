export const areAllValuesUndefined = (obj: Record<string, any>): boolean =>
  Object.values(obj).every((value) => value === undefined);
