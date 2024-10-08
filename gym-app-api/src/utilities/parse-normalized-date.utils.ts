export const parseNormalizedDate = (dateString: string): Date | null => {
  const date = new Date(dateString);
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
};
