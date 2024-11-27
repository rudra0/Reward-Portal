import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserMonthlyRewardsTable from "../components/table/userMonthlyRewardsTable";
import { TEXTS } from "../constants/textConstants";

jest.mock("../utils/calculateRewards", () => ({
  calculateRewards: jest.fn((price) => {
    if (typeof price === "string") price = parseFloat(price);
    if (isNaN(price) || price <= 0) return 0;
    return price > 50 ? (price - 50) * 2 : 0;
  }),
}));

jest.mock("../utils/dateUtils", () => ({
  filterByMonthYear: jest.fn((data, year, month) =>
    data.filter((item) => {
      const date = new Date(item.date);
      return (
        !isNaN(date) && date.getFullYear() === year && date.getMonth() === month
      );
    })
  ),
  getUniqueMonths: jest.fn(() => ["2024-9", "2024-10"]), // Ensure it returns a valid array of months
}));

describe("UserMonthlyRewardsTable Component", () => {
  const mockData = [];

  it("handles invalid data gracefully", () => {
    render(<UserMonthlyRewardsTable data={mockData} />);
    expect(screen.getByText(TEXTS.NO_DATA_AVAILABLE)).toBeInTheDocument();
  });
});
