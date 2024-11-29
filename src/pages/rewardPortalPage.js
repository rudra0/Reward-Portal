import React, { useState } from 'react';
import UserMonthlyRewardsTable from '../components/table/userMonthlyRewardsTable';
import TotalRewardsTable from '../components/table/totalRewardsTable';
import TransactionsTable from '../components/table/transactionsTable';
import transactions from '../data/sampleData';
import { getLastThreeMonthsData } from '../utils/dateUtils';
import { TEXTS } from '../constants/textConstants';

const RewardPortalPage = () => {
  const [activeTab, setActiveTab] = useState('transactions'); // Default tab
  const filteredData = getLastThreeMonthsData(transactions);

  if (!filteredData || filteredData.length === 0) {
    return <p>No recent transactions available.</p>;
  }

  return (
    <div className="reward-portal">
      <h1>{TEXTS.WELCOME_TEXT}</h1>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          {TEXTS.TRANSACTIONS}
        </button>
        <button
          className={`tab-button ${activeTab === 'monthlyRewards' ? 'active' : ''}`}
          onClick={() => setActiveTab('monthlyRewards')}
        >
          {TEXTS.MONTHLY_REWARDS}
        </button>
        <button
          className={`tab-button ${activeTab === 'totalRewards' ? 'active' : ''}`}
          onClick={() => setActiveTab('totalRewards')}
        >
          {TEXTS.TOTAL_REWARDS}
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'transactions' && <TransactionsTable data={transactions} />}
        {activeTab === 'monthlyRewards' && <UserMonthlyRewardsTable data={filteredData} />}
        {activeTab === 'totalRewards' && <TotalRewardsTable data={filteredData} />}
      </div>
    </div>
  );
};

export default RewardPortalPage;
