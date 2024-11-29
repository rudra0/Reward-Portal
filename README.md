
<img width="1440" alt="Screenshot 2024-11-29 at 10 58 24 AM" src="https://github.com/user-attachments/assets/9f85c0b0-04de-4417-801d-ffe36080deaa">

**Above is total Transaction Table**

<img width="1440" alt="Screenshot 2024-11-29 at 10 57 26 AM" src="https://github.com/user-attachments/assets/a468067f-82ae-4cb8-ab50-f875c0a5bf7b">



**Above is the Monthly Rewards for employees for latest last 3 months**


<img width="1440" alt="Screenshot 2024-11-29 at 10 58 53 AM" src="https://github.com/user-attachments/assets/e1c09b45-d387-4d5e-a95c-06b649efe564">

**Above is the Total Rewards Table**

<img width="1440" alt="Screenshot 2024-11-29 at 9 55 33 AM" src="https://github.com/user-attachments/assets/f18091a2-8e18-48ec-b2b6-3a4fbf2e48ac">

**Above is Loading State of and application while fetching data**




# Reward Portal Application

This project is a Rewards Program Application designed to track and calculate reward points for customers based on their transactions. It includes multiple tables for managing and displaying transactions, monthly rewards, and total rewards. The application is built using React and follows modern best practices.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Features
This Application have Tabs view so that user can easily moves to preferred tabs only by clicking on Transaction, Monthly Rewards, Total Rewards Tabs
Transactions Table: Displays detailed transaction data with a sorting data filter based on latest and oldest records.
Total Rewards Table: Aggregates and displays reward points per customer for the last three months.
Monthly Rewards Table: Shows rewards data grouped by month for a specific year.
Reusable Components: Implements reusable components optimized with React.memo.
Unit Testing: Comprehensive test cases using Jest and React Testing Library.

# Explanation of Each Folder

components/

Houses all reusable React components.
Tables/: Contains table components like TransactionsTable.js, TotalRewardsTable.js, and MonthlyRewardsTable.js.
Error/: Contains the ErrorComponent.js, which is used for handling and displaying errors.
Loader/: Contains the LoaderComponent.js, used for displaying loading states.

__tests__/

Contains all the test files for the project.
Test files are kept separate to ensure the components directory is clean and focuses solely on implementation.
styles/

Stores the global CSS file (styles.css).

**utils/**

Contains helper utilities, such as:
logger.js: Custom logger for debugging.
transactionHelper.js: calculate transactions.
calculateRewards.js: Function to calculate reward points.
dateUtils.js: Helper functions for date-related operations.
formatDates.js: Helps in formatting the date
Root-Level Files

**service/**
api.js: used to handle api calls 

README.md: Documentation for the project.

.gitignore: Specifies intentionally untracked files.
package.json: Contains project dependencies and scripts.

This structure keeps components modular, test files organized, and utilities centralized, adhering to best practices. Let me know if you'd like further refinements!


# Usage

View Transactions: Access the Transactions Table to see all transactions.
View Total Rewards: Navigate to the Total Rewards Table to see aggregated reward points.
View Monthly Rewards: Check the Monthly Rewards Table for month-wise reward breakdowns.


# Testing
Tools Used
Jest: Unit testing framework.
React Testing Library: For rendering and interacting with components.
Test Cases
TransactionsTable:

Verify if data renders correctly.
Test for empty datasets.
Validate reward point calculations.
TotalRewardsTable:

Check reward aggregation logic.
Ensure rendering optimization with React.memo.
UserMonthlyRewardsTable:

Test month filtering.
Validate utility function usage.

# Coding Practices
React.memo: Used in components like TotalRewardRow to optimize performance.
useMemo: Memoized heavy computations like filtering and aggregation.
Prop Validation: Validates component props for safer usage.
Separation of Concerns: Split logic into utilities to keep components clean.
Future Enhancements
Backend Integration: mock data.

# Components and Logic Explanation
TransactionsTable.js
The TransactionsTable component displays a list of transactions, showing the following details:

Transaction ID
Customer Name
Purchase Date
Product Purchased
Price
Reward Points
Reward Points Calculation:
Reward Points: The reward points for a transaction are calculated using a utility function calculateRewards.js, which computes the points based on the transaction's price.

**Example logic in calculateRewards.js:**

export const calculateRewards = (price) => {
  if (typeof price !== "number" || isNaN(price) || price <= 0) {
    return 0; // Return 0 for invalid prices
  }

  let rewards = 0;

  // Points for the amount between $50 and $100
  if (price > 50) {
    rewards += Math.min(price, 100) - 50; // Reward 1 point for each dollar between 50 and 100
  }

  // Points for the amount above $100
  if (price > 100) {
    rewards += (price - 100) * 2; // Reward 2 points for each dollar above 100
  }

  // Round the rewards to the nearest integer
  return Math.round(rewards);
};

Example of how the calculateRewards method works with different inputs, along with some test cases you can use to validate it.
Logic Recap
The reward calculation:

1 point for every dollar spent between $50 and $100.
2 points for every dollar spent above $100.
If the input is invalid (e.g., negative or non-numeric), the reward is 0.
Purchases below $50 receive no reward points.

TotalRewardsTable.js
The TotalRewardsTable component aggregates the total rewards points for each customer across all transactions.

Total Rewards Calculation:
Aggregating Rewards: The total rewards are calculated by iterating over all transactions and summing up the reward points for each customer using the calculateRewards utility.

Example logic:

const totalRewards = useMemo(() => {
  return data?.reduce((acc, { customerName, price }) => {
    acc[customerName] = acc[customerName] || 0;
    acc[customerName] += calculateRewards(price);
    return acc;
  }, {});
}, [data]);

MonthlyRewardsTable.js
The MonthlyRewardsTable component displays reward points for each customer in a specific month and year.

Filtering and Calculating Monthly Rewards:
Filtering by Month and Year: The transactions are filtered by the provided monthYear (e.g., '2024-11'), and only transactions for that month are displayed.

Displaying Rewards: For each filtered transaction, the calculateRewards function is used to display the corresponding reward points.

Logic for filtering by month and year:

const monthlyData = filterByMonthYear(data, year, month);

dateUtils.js
Utility functions for working with dates:

filterByMonthYear: Filters the transactions based on the provided year and month.
getUniqueMonths: Returns all unique month-year combinations from the dataset for displaying monthly reward tables.


# Folder Structure

<img width="298" alt="Screenshot 2024-11-29 at 11 21 24 AM" src="https://github.com/user-attachments/assets/92de2aed-584b-4af2-a092-66b59b9e3eca">


src/
├── __tests__/
│   └── transactionsTable.test.js
│   └── totalRewardsTable.test.js
│   └── monthlyRewardsTable.test.js
├── components/
│   ├── tables/
│   │   ├── transactionsTable.js
│   │   ├── totalRewardsTable.js
│   │   ├── monthlyRewardsTable.js
│   ├── error.js
│   ├── loader.js
├── constants/
│   └── textConstants.js
├── data/
│   └── mockData.js
├── hooks/
│   └── useFetchData.js
├── pages/
│   ├── rewardPortalPage.js
├── service/
│   └── api.js
├── styles/
│   ├── App.css
│   ├── index.css
├── utils/
│   ├── calculateRewards.js
│   ├── dateUtils.js
│   ├── logger.js
├── App.js
├── App.test.js
├── index.js
├── logo.svg
├── reportWebVitals.js
├── setupTests.js

.gitignore
package-lock.json
package.json
README.md

Components and Logic Explanation
TransactionsTable.js
The TransactionsTable component displays a list of transactions, showing the following details:
TotalRewardsTable.js
The TotalRewardsTable component aggregates the total rewards points for each customer across all transactions.
MonthlyRewardsTable.js
The MonthlyRewardsTable component displays reward points for each customer in a specific month and year.

**Testing**
We use Jest and React Testing Library for unit tests. Tests are located in the __tests__ folder.

Transaction Table Test (TransactionsTable.test.js): Tests for correct rendering of the transactions table.
Total Rewards Table Test (TotalRewardsTable.test.js): Tests for correct aggregation of total reward points by customer.
Monthly Rewards Table Test (MonthlyRewardsTable.test.js): Tests for filtering and displaying rewards based on the selected month and year.
Logging
We have implemented a logger using loglevel to log important information like data fetching status, errors, and calculations.

# Logger Setup:

import log from 'loglevel';

log.setLevel('debug');  // Set log level to 'debug' for development

log.debug('Debugging message');
log.info('Information message');
log.error('Error message');

# Notes
The calculateRewards function is essential for calculating the reward points based on the price of each transaction.
All the components are designed to be reusable and support filtering by time periods (e.g., last 3 months, monthly).
The app supports basic error handling and loading states using components like error.js and loader.js.

