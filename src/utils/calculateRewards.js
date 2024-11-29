export const calculateRewards = (price) => {
  if (typeof price !== "number" || isNaN(price) || price <= 0) {
    return 0; // Return 0 for invalid prices
  }

  let rewards = 0;

  // Points for the amount between $50 and $100
  if (price > 50) {
    rewards += Math.min(price, 100) - 50; // Reward 1 point for each dollar between 50 and 100
  }

  // Points for the amount above $100
  if (price > 100) {
    rewards += (price - 100) * 2; // Reward 2 points for each dollar above 100
  }

  // Round the rewards to the nearest integer
  return Math.round(rewards);
};
