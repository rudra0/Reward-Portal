export const getLastThreeMonthsData = (data) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  // Filter out transactions with invalid dates
  const validData = data.filter((transaction) => {
    const date = new Date(transaction.date);
    return !isNaN(date); // Check if the date is valid
  });

  // Get unique months and years from the dataset
  const uniqueMonths = [...new Set(validData.map((transaction) => {
    const date = new Date(transaction.date);
    return `${date.getFullYear()}-${date.getMonth()}`;
  }))];

  // Sort unique months in descending order (most recent first)
  uniqueMonths.sort((a, b) => {
    const [yearA, monthA] = a.split('-').map(Number);
    const [yearB, monthB] = b.split('-').map(Number);
    return yearB - yearA || monthB - monthA;
  });

  // Take the most recent three months (current month + last two months)
  const recentThreeMonths = uniqueMonths.slice(0, 3);

  // Filter the data based on the selected months
  return validData.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const transactionKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth()}`;
    return recentThreeMonths.includes(transactionKey);
  });
};


export const filterByMonthYear = (data, year, month) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  // Filter out transactions with invalid dates
  const validData = data.filter(({ date }) => {
    const d = new Date(date);
    return !isNaN(d); // Check if the date is valid
  });

  // Filter transactions by the specified year and month
  return validData.filter(({ date }) => {
    const d = new Date(date);
    return d?.getFullYear() === year && d?.getMonth() === month;
  });
};

export const getUniqueMonths = (data) => {

  const uniqueMonths = new Set(
    data
      .map((item) => {
        const date = new Date(item.date);
        if (isNaN(date)) {
          return null;
        }
        return `${date.getFullYear()}-${date.getMonth()}`;
      })
      .filter(Boolean) // Filter out null values (invalid dates)
  );

  const result = Array.from(uniqueMonths);
  return result;
};



