Sharing the screenshots of Reward Portal

**Below screen is main screen having tabular feature so that user can easily switch between tabs and also set Transaction table as default **
<img width="1440" alt="Screenshot 2024-11-26 at 2 41 05 PM" src="https://github.com/user-attachments/assets/9c596022-dbd3-4978-9b6b-4b13d26c4eca">





<img width="1440" alt="Screenshot 2024-11-26 at 2 42 53 PM" src="https://github.com/user-attachments/assets/41e95394-168a-4380-8c34-29df547382d2">


**Above is the Monthly Rewards for employees for latest last 3 months**


<img width="1440" alt="Screenshot 2024-11-26 at 2 43 20 PM" src="https://github.com/user-attachments/assets/656690f2-91e3-467f-ad6d-d6ea7651ed1c">

**Above is Total Rewards Table for employees**

**Adding test cases passed screenshot below**

<img width="1440" alt="Screenshot 2024-11-26 at 2 44 37 PM" src="https://github.com/user-attachments/assets/3ad03fcf-244d-4872-bee7-0dea464b143a">

Adding the folder structure of the Project

<img width="313" alt="Screenshot 2024-11-26 at 2 48 13 PM" src="https://github.com/user-attachments/assets/9ab7d337-28e9-49e7-82c9-253311f9a5c3">


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
utils/

Contains helper utilities, such as:
logger.js: Custom logger for debugging.
calculateRewards.js: Function to calculate reward points.
dateUtils.js: Helper functions for date-related operations.
Root-Level Files

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

Example logic in calculateRewards.js:

export const calculateRewards = (price) => {
  if (price > 100) {
    return Math.floor(price * 0.1) + Math.floor((price - 100) * 0.2);
  } else if (price > 50) {
    return Math.floor((price - 50) * 0.1);
  }
  return 0;
};
Purchases above $100 get 10% of the first $100 and 20% for the remaining amount.
Purchases between $50 and $100 get 10% for the amount over $50.
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

monthlyRewardsTable.js
The MonthlyRewardsTable component displays reward points for each customer in a specific month and year.

Filtering and Calculating Monthly Rewards:
Filtering by Month and Year: The transactions are filtered by the provided monthYear (e.g., '2024-11'), and only transactions for that month are displayed.

Displaying Rewards: For each filtered transaction, the calculateRewards function is used to display the corresponding reward points.

Logic for filtering by month and year:

const monthlyData = filterByMonthYear(data, year, month);
calculateRewards.js
This utility file contains the logic for calculating reward points based on a purchase price.

Example Logic:
Purchases over $100:
First $100: 10% reward.
Amount above $100: 20% reward.
Purchases between $50 and $100:
Only 10% of the amount over $50.
Purchases below $50 receive no reward.
dateUtils.js
Utility functions for working with dates:

filterByMonthYear: Filters the transactions based on the provided year and month.
getUniqueMonths: Returns all unique month-year combinations from the dataset for displaying monthly reward tables.


Below is an updated README.md template for your project, including explanations on how rewards are calculated and other relevant logic.

Project Name: Rewards App
Description
This project is a Rewards System that calculates and displays transaction data, total rewards, and monthly rewards. It uses React components, hooks, and utilities to manage and display reward-related data based on transactions.

The system aggregates reward points from purchases made by customers and displays them in various tables such as:

Transaction Table
Total Rewards Table
Monthly Rewards Table

# Folder Structure

public/
├── logo192.png
├── logo512.png
├── manifest.json
├── robots.txt
src/
├── __tests__/
│   └── transactionsTable.test.js
│   └── totalRewardsTable.test.js
│   └── monthlyRewardsTable.test.js
├── components
│   └── table
│       ├── totalRewardsTable.js
│       ├── transactionsTable.js
│       ├── userMonthlyRewardsTable.js
│       ├── errorMessage.js
│       └── loadingIndicator.js
├── constants
│   └── textConstants.js
├── data
│   └── sampleData.js
├── hooks
│   └── useFetchData.js
├── pages
│   └── rewardPortalPage.js
├── styles
│   └── styles.css
├── utils
│   ├── calculateRewards.js
│   ├── dateUtils.js
│   ├── formatDates.js
│   ├── logger.js
│   └── transactionHelper.js
├── App.css
└── App.js
├── index.js
├── logo.svg
├── reportWebVitals.js
├── setupTests.js

.gitignore
package-lock.json
package.json
README.md

Components and Logic Explanation
transactionsTable.js
The TransactionsTable component displays a list of transactions, showing the following details:

Transaction ID
Customer Name
Purchase Date
Product Purchased
Price
Reward Points
Reward Points Calculation:
Reward Points: The reward points for a transaction are calculated using a utility function calculateRewards.js, which computes the points based on the transaction's price.

Example logic in calculateRewards.js:

export const calculateRewards = (price) => {
  if (price > 100) {
    return Math.floor(price * 0.1) + Math.floor((price - 100) * 0.2);
  } else if (price > 50) {
    return Math.floor((price - 50) * 0.1);
  }
  return 0;
};
Purchases above $100 get 10% of the first $100 and 20% for the remaining amount.
Purchases between $50 and $100 get 10% for the amount over $50.
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
calculateRewards.js
This utility file contains the logic for calculating reward points based on a purchase price.

Example Logic:
Purchases over $100:
First $100: 10% reward.
Amount above $100: 20% reward.
Purchases between $50 and $100:
Only 10% of the amount over $50.
Purchases below $50 receive no reward.
dateUtils.js
Utility functions for working with dates:

filterByMonthYear: Filters the transactions based on the provided year and month.
getUniqueMonths: Returns all unique month-year combinations from the dataset for displaying monthly reward tables.
Testing
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
The app supports basic error handling and loading states using components like Error.js and Loader.js.

