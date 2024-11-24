import React, { useMemo } from 'react';
import { calculateRewards } from '../../utils/calculateRewards';
import { TEXTS } from '../../constants/textConstants';

const TotalRewardRow = React.memo(({ customerName, points }) => (
  <tr>
    <td>{customerName}</td>
    <td>{points}</td>
  </tr>
));

const TotalRewardsTable = ({ data }) => {
  // Aggregate total rewards by customer for the last 3 months
  const totalRewards = useMemo(() => {
    return data?.reduce((acc, { customerName, price }) => {
      acc[customerName] = acc[customerName] || 0;
      acc[customerName] += calculateRewards(price);
      return acc;
    }, {});
  }, [data]);

  return (
    <div>
      <h2>{TEXTS.TOTAL_REWARDS}</h2>
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

export default TotalRewardsTable