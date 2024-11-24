import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { TEXTS } from '../../constants/textConstants';
import TotalRewardsTable from '../components/Table/TotalRewardsTable';

// Mock utility function
jest.mock('../../utils/calculateRewards', () => ({
  calculateRewards: jest.fn((price) => (price > 100 ? price * 2 : price)),
}));

describe('TotalRewardsTable Component', () => {
  const mockData = [
    { id: 25, customerId: 103, customerName: 'Ricardo', date: '2024-03-05', product: 'Backpack', price: 80.0 },
    { id: 26, customerId: 102, customerName: 'David', date: '2024-03-12', product: 'Tablet', price: 300.0 },
    { id: 27, customerId: 104, customerName: 'Sophia', date: '2024-03-25', product: 'Headphones', price: 100.0 },
  ];

  test('renders the table headers correctly', () => {
    render(<TotalRewardsTable data={mockData} />);

    expect(screen.getByText(TEXTS.CUSTOMER_NAME)).toBeInTheDocument();
    expect(screen.getByText(TEXTS.TOTAL_REWARD_POINTS)).toBeInTheDocument();
  });

  test('displays the correct reward points for each customer', () => {
    render(<TotalRewardsTable data={mockData} />);

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();

    // Check the calculated points
    expect(screen.getByText('320')).toBeInTheDocument(); // Alice: 120 * 2 + 80
    expect(screen.getByText('50')).toBeInTheDocument();  // Bob: 50
    expect(screen.getByText('30')).toBeInTheDocument();  // Charlie: 30
  });

  test('displays a no rewards message when data is empty', () => {
    render(<TotalRewardsTable data={[]} />);

    expect(screen.getByText(TEXTS.NO_TOTAL_REWARDS_AVAILABLE)).toBeInTheDocument();
  });

  test('handles undefined or null data gracefully', () => {
    render(<TotalRewardsTable data={null} />);

    expect(screen.getByText(TEXTS.NO_TOTAL_REWARDS_AVAILABLE)).toBeInTheDocument();
  });
});
