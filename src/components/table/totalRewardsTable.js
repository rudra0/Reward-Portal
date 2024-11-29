import React, { useMemo } from 'react';
import { calculateRewards } from '../../utils/calculateRewards';
import { TEXTS } from '../../constants/textConstants';

// Row component for displaying individual customer rewards
const TotalRewardRow = React.memo(({ customerName, points }) => (
  <tr>
    <td>{customerName}</td>
    <td>{points}</td>
  </tr>
));

const TotalRewardsTable = ({ data }) => {
  // Aggregate total rewards by customer for the last 3 months
  const totalRewards = useMemo(() => {
    if (!data || data.length === 0) return {}; // Handle empty data

    return data.reduce((acc, { customerName, price }) => {
      acc[customerName] = acc[customerName] || 0;
      // Calculate rewards and ensure we handle invalid prices
      const rewardPoints = calculateRewards(price);
      acc[customerName] += rewardPoints || 0; // Add 0 if NaN or invalid
      return acc;
    }, {});
  }, [data]);

  return (
    <div>
      <div className="transaction-header">
        <h2 className="transaction-title">{TEXTS.TOTAL_REWARDS}</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th>{TEXTS.CUSTOMER_NAME}</th>
            <th>{TEXTS.TOTAL_REWARD_POINTS}</th>
          </tr>
        </thead>
        <tbody>
          {totalRewards && Object.entries(totalRewards).length > 0 ? (
            Object.entries(totalRewards).map(([customerName, points]) => (
              <TotalRewardRow key={customerName} customerName={customerName} points={points} />
            ))
          ) : (
            <tr>
              <td colSpan="2">{TEXTS.NO_TOTAL_REWARDS_AVAILABLE}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


export default TotalRewardsTable;
