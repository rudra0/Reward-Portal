import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // for extended matchers
import { TEXTS } from "../constants/textConstants";
import TransactionsTable from "../components/Table/TransactionsTable";

// Mock implementation of calculateRewards
jest.mock("../utils/calculateRewards", () => ({
  calculateRewards: (price) => (price > 50 ? Math.floor(price - 50) * 2 : 0),
}));

describe("TransactionsTable Component", () => {
  it("renders the table header correctly", () => {
    render(<TransactionsTable data={[]} />);

    expect(screen.getByText(TEXTS.TRANSACTIONS)).toBeInTheDocument();
    expect(screen.getByText(TEXTS.TRANSACTION_ID)).toBeInTheDocument();
    expect(screen.getByText(TEXTS.CUSTOMER_NAME)).toBeInTheDocument();
    expect(screen.getByText(TEXTS.PURCHASE_DATE)).toBeInTheDocument();
    expect(screen.getByText(TEXTS.PRODUCT_PURCHASED)).toBeInTheDocument();
    expect(screen.getByText(TEXTS.PRICE)).toBeInTheDocument();
    expect(screen.getByText(TEXTS.REWARD_POINTS)).toBeInTheDocument();
  });

  it("displays a message when no data is available", () => {
    render(<TransactionsTable data={[]} />);
    expect(
      screen.getByText(TEXTS.NO_TRANSACTIONS_AVAILABLE)
    ).toBeInTheDocument();
  });

  it("renders a row for each transaction in the data", () => {
    const mockData = [
      {
        id: 25,
        customerId: 103,
        customerName: "Ricardo",
        date: "2024-03-05",
        product: "Backpack",
        price: 80.0,
      },
      {
        id: 26,
        customerId: 102,
        customerName: "David",
        date: "2024-03-12",
        product: "Tablet",
        price: 300.0,
      },
      {
        id: 27,
        customerId: 104,
        customerName: "Sophia",
        date: "2024-03-25",
        product: "Headphones",
        price: 100.0,
      },
    ];

    render(<TransactionsTable data={mockData} />);

    // Check that table rows match the data provided
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(
      screen.getByText(new Date("2023-11-15").toLocaleDateString())
    ).toBeInTheDocument();
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("$1200.50")).toBeInTheDocument();
    expect(screen.getByText("2301")).toBeInTheDocument(); // Mocked rewards

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(
      screen.getByText(new Date("2023-12-10").toLocaleDateString())
    ).toBeInTheDocument();
    expect(screen.getByText("Smartphone")).toBeInTheDocument();
    expect(screen.getByText("$800.00")).toBeInTheDocument();
    expect(screen.getByText("1500")).toBeInTheDocument(); // Mocked rewards
  });
});
