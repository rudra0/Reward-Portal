import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserMonthlyRewardsTable from "../components/UserMonthlyRewardsTable/UserMonthlyRewardsTable";

jest.mock("../utils/calculateRewards", () => ({
  calculateRewards: (price) => (price > 50 ? Math.floor(price - 50) * 2 : 0),
}));

jest.mock("../utils/dateUtils", () => ({
  filterByMonthYear: jest.fn((data, year, month) =>
    data.filter((item) => {
      const transactionDate = new Date(item.date);
      return (
        transactionDate.getFullYear() === year &&
        transactionDate.getMonth() === month
      );
    })
  ),
  getUniqueMonths: jest.fn((data) => {
    const uniqueMonths = new Set(
      data.map((item) => {
        const date = new Date(item.date);
        return `${date.getFullYear()}-${date.getMonth()}`;
      })
    );
    return Array.from(uniqueMonths);
  }),
}));

describe("UserMonthlyRewardsTable Component", () => {
  const mockData = [
    {
      id: 1,
      customerId: "C001",
      customerName: "John Doe",
      date: "2023-10-15",
      price: 120.5,
    },
    {
      id: 2,
      customerId: "C002",
      customerName: "Jane Smith",
      date: "2023-10-20",
      price: 80.0,
    },
    {
      id: 3,
      customerId: "C001",
      customerName: "John Doe",
      date: "2023-11-01",
      price: 50.0,
    },
  ];

  it("renders the User Monthly Rewards heading", () => {
    render(<UserMonthlyRewardsTable data={mockData} />);
    expect(screen.getByText("User Monthly Rewards")).toBeInTheDocument();
  });

  it("renders unique months correctly", () => {
    render(<UserMonthlyRewardsTable data={mockData} />);
    expect(screen.getByText("Rewards for October 2023")).toBeInTheDocument();
    expect(screen.getByText("Rewards for November 2023")).toBeInTheDocument();
  });

  it("renders data for each month correctly", () => {
    render(<UserMonthlyRewardsTable data={mockData} />);

    // October 2023
    expect(screen.getByText("C001")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("$120.50")).toBeInTheDocument();
    expect(
      screen.getByText(new Date("2023-10-15").toLocaleDateString())
    ).toBeInTheDocument();
    expect(screen.getByText("141")).toBeInTheDocument(); // Mocked reward points

    expect(screen.getByText("C002")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("$80.00")).toBeInTheDocument();
    expect(
      screen.getByText(new Date("2023-10-20").toLocaleDateString())
    ).toBeInTheDocument();
    expect(screen.getByText("60")).toBeInTheDocument(); // Mocked reward points

    // November 2023
    expect(screen.getByText("$50.00")).toBeInTheDocument();
    expect(
      screen.getByText(new Date("2023-11-01").toLocaleDateString())
    ).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument(); // Mocked reward points
  });

  it("calls utility functions correctly", () => {
    const {
      filterByMonthYear,
      getUniqueMonths,
    } = require("../utils/dateUtils");

    render(<UserMonthlyRewardsTable data={mockData} />);

    // Verify getUniqueMonths is called with the sorted data
    expect(getUniqueMonths).toHaveBeenCalledWith(
      mockData.sort((a, b) => new Date(a.date) - new Date(b.date))
    );

    // Verify filterByMonthYear is called for each unique month
    expect(filterByMonthYear).toHaveBeenCalledWith(mockData, 2023, 9); // October (0-based month)
    expect(filterByMonthYear).toHaveBeenCalledWith(mockData, 2023, 10); // November
  });
});
