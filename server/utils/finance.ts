/**
 * Round financial values safely.
 */
export const roundMoney = (
  amount: number
): number => {
  return Number(
    amount.toFixed(2)
  );
};