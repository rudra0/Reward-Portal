export const getLastThreeMonthsData = (data) => {
  if (!data || data.length === 0) return [];

  // Get unique months and years from the dataset
  const uniqueMonths = [...new Set(data.map((transaction) => {
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
  return data.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    const transactionKey = `${transactionDate.getFullYear()}-${transactionDate.getMonth()}`;
    return recentThreeMonths.includes(transactionKey);
  });
};

export const filterByMonthYear = (data, year, month) => {
  return data.filter(({ date }) => {
    const d = new Date(date);
    return d?.getFullYear() === year && d?.getMonth() === month;
  });
};

export const getUniqueMonths = (data) => {
  const uniqueMonths = new Set(
    data?.map(({ date }) => {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth()}`; // Format: "Year-Month"
    })
  );
  return [...uniqueMonths];
};
