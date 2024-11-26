import React, { useState } from 'react';
import { TEXTS } from '../../constants/textConstants';
import { processTransactionData } from '../../utils/transactionHelper';
import { FaSortDown, FaSortUp } from 'react-icons/fa'; 

const TransactionsTable = ({ data }) => {
  const [isDescending, setIsDescending] = useState(true); // State to toggle sorting order

  const handleSortToggle = () => {
    setIsDescending((prev) => !prev); // Toggle sorting order
  };

  // Sort data based on the selected order
  const sortedData = data
    ?.filter((item) => !isNaN(new Date(item.date)))
    .sort((a, b) => (isDescending ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)));

  const processedData = sortedData?.length > 0 ? processTransactionData(sortedData) : [];

  return (
    <div>
      <div className="transaction-header">
        <h2 className="transaction-title">{TEXTS.TRANSACTIONS}</h2>
        <button
          onClick={handleSortToggle}
          className="sort-button"
          title="Sort Order"
        >
          {isDescending ? (
            <span>
              Sort by Older Month <FaSortDown className="icon" />
            </span>
          ) : (
            <span>
              Sort by Latest Month <FaSortUp className="icon" />
            </span>
          )}
        </button>
      </div>
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
          {processedData.length > 0 ? (
            processedData.map(({ id, customerName, formattedDate, product, formattedPrice, rewardPoints }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{customerName}</td>
                <td>{formattedDate}</td>
                <td>{product}</td>
                <td>${formattedPrice}</td>
                <td>{rewardPoints}</td>
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
