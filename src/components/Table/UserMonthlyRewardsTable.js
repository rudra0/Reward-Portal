import React from 'react';
import '../../styles/styles.css';  // Import the CSS file
import { calculateRewards } from '../../utils/calculateRewards';
import { TEXTS } from '../../constants/textConstants';
import { filterByMonthYear, getUniqueMonths } from '../../utils/dateUtils';

const MonthlyRewardsTable = ({ data, monthYear }) => {
  const [year, month] = monthYear.split('-').map(Number);

  const monthlyData = filterByMonthYear(data, year, month);

  return (
    <div>
      <h3>{`Rewards for ${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`}</h3>
      <table>
        <thead>
          <tr>
            <th>{TEXTS.CUSTOMER_ID}</th>
            <th>{TEXTS.CUSTOMER_NAME}</th>
            <th>{TEXTS.AMOUNT_SPENT}</th>
            <th>{TEXTS.TRANSACTION_DATE}</th>
            <th>{TEXTS.TRANSACTION_YEAR}</th>
            <th>{TEXTS.REWARD_POINTS}</th>
          </tr>
        </thead>
        <tbody>
          {monthlyData?.map(({ id, customerId, customerName, date, price }) => {
            const transactionDate = new Date(date);
            const rewardPoints = calculateRewards(price);
            return (
              <tr key={id}>
                <td>{customerId}</td>
                <td>{customerName}</td>
                <td>${price.toFixed(2)}</td>
                <td>{transactionDate.toLocaleDateString()}</td>
                <td>{transactionDate.getFullYear()}</td>
                <td>{rewardPoints}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const UserMonthlyRewardsTable = ({ data }) => {

  // Sorting the data by year and month during rendering
  const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));
  const uniqueMonths = getUniqueMonths(sortedData);

  return (
    <div>
      <h2>User Monthly Rewards</h2>
      {uniqueMonths.map((monthYear) => (
        <MonthlyRewardsTable key={monthYear} data={sortedData} monthYear={monthYear} />
      ))}
    </div>
  );
};

export default UserMonthlyRewardsTable;
