export const generateReferralCode = (
  fullName: string
): string => {
  const prefix = fullName
    .replace(/\s/g, "")
    .substring(0, 4)
    .toUpperCase();

  const random = Math.floor(
    100000 + Math.random() * 900000
  );

  return `${prefix}${random}`;
};