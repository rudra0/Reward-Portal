import React from 'react';
import '../../styles/styles.css';
import { calculateRewards } from '../../utils/calculateRewards';
import { TEXTS } from '../../constants/textConstants';
import { filterByMonthYear, getUniqueMonths } from '../../utils/dateUtils';

const MonthlyRewardsTable = ({ data, monthYear }) => {
  const [year, month] = monthYear.split('-').map(Number);

  const monthlyData = filterByMonthYear(data, year, month);

  return (
    <div>
      <div className="transaction-header">
        <h2 className="transaction-title">{`Rewards for ${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`}</h2>
      </div>
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
  if (!data || data.length === 0) {
    return <p>{TEXTS.NO_DATA_AVAILABLE}</p>;
  }

  const sortedData = data
    .filter((item) => !isNaN(new Date(item.date)))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const uniqueMonths = getUniqueMonths(sortedData);

  return (
    <div>
      {uniqueMonths?.length > 0 ? (
        uniqueMonths.map((monthYear) => (
          <MonthlyRewardsTable key={monthYear} data={sortedData} monthYear={monthYear} />
        ))
      ) : (
        <p>{TEXTS.NO_REWARDS_DATA}</p>
      )}
    </div>
  );
};


export default UserMonthlyRewardsTable;
