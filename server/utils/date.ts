/**
 * Normalize date to start of day UTC.
 */
export const normalizeProcessingDate = (
  date: Date
): Date => {
  const normalized = new Date(date);

  normalized.setUTCHours(
    0,
    0,
    0,
    0
  );

  return normalized;
};