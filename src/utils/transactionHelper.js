import { calculateRewards } from "./calculateRewards";

// Helper function to process transaction data
export const processTransactionData = (data) =>
  data.map(({ id, customerName, date, product, price }) => {
    const isPriceValid = !isNaN(price) && price > 0;
    const formattedPrice = isPriceValid ? price.toFixed(2) : 'N/A';
    const rewardPoints = isPriceValid ? calculateRewards(price) : 0;

    const isDateValid = !isNaN(new Date(date).getTime());
    const formattedDate = isDateValid ? new Date(date).toLocaleDateString() : 'Invalid Date';

    return {
      id,
      customerName,
      formattedDate,
      product,
      formattedPrice,
      rewardPoints,
    };
  });