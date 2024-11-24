export const calculateRewards = (price) => {
  const over100 = Math.max(0, price - 100);
  const over50 = Math.max(0, Math.min(price - 50, 50));
  return Math.floor(over100 * 2 + over50);
};
