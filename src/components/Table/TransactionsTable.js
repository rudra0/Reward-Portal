import React from 'react';
import { calculateRewards } from '../../utils/calculateRewards';
import { TEXTS } from '../../constants/textConstants';

const TransactionsTable = ({ data }) => {
  return (
    <div>
      <h2>{TEXTS.TRANSACTIONS}</h2>
      <table>
        <thead>
          <tr>
            <th>{TEXTS.TRANSACTION_ID}</th>
            <th>{TEXTS.CUSTOMER_NAME}</th>
            <th>{TEXTS.PURCHASE_DATE}</th>
            <th>{TEXTS.PRODUCT_PURCHASED}</th>
            <th>{TEXTS.PRICE}</th>
            <th>{TEXTS.REWARD_POINTS}</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map(({ id, customerName, date, product, price }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{customerName}</td>
                <td>{new Date(date).toLocaleDateString()}</td>
                <td>{product}</td>
                <td>${price.toFixed(2)}</td>
                <td>{calculateRewards(price)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">{TEXTS.NO_TRANSACTIONS_AVAILABLE}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
