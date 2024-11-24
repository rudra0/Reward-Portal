import React from 'react';
import UserMonthlyRewardsTable from '../components/Table/UserMonthlyRewardsTable';
import TotalRewardsTable from '../components/Table/TotalRewardsTable';
import TransactionsTable from '../components/Table/TransactionsTable';
import { transactions } from '../data/sampleData';
import { getLastThreeMonthsData } from '../utils/dateUtils';

const RewardPortalPage = () => {
  const filteredData = getLastThreeMonthsData(transactions);

  if (!filteredData || filteredData.length === 0) {
    return <p>No recent transactions available.</p>;
  }

  return (
    <div className="reward-portal">
      <UserMonthlyRewardsTable data={filteredData} />
      <TotalRewardsTable data={filteredData} />
      <TransactionsTable data={filteredData} />
    </div>
  );
};

export default RewardPortalPage;
