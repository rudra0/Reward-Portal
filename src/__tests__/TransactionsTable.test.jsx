import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TEXTS } from "../constants/textConstants";
import TransactionsTable from "../components/table/transactionsTable";

jest.mock("../utils/calculateRewards", () => ({
  calculateRewards: jest.fn((price) => {
    if (typeof price !== "number" || isNaN(price) || price <= 0) {
      return 0;
    }
    let rewards = 0;

    if (price > 50) {
      rewards += Math.min(price, 100) - 50;
    }

    if (price > 100) {
      rewards += (price - 100) * 2;
    }

    return rewards;
  }),
}));

describe("TransactionsTable Component", () => {
  const mockData = [
    {
      id: 1,
      customerName: "John",
      date: "2024-11-15",
      product: "Laptop",
      price: 1200.0,
    },
    {
      id: 2,
      customerName: "Jane",
      date: "invalid-date",
      product: "Smartphone",
      price: 800,
    },
    {
      id: 3,
      customerName: "Doe",
      date: "2024-11-10",
      product: "Tablet",
      price: "invalid-price",
    },
  ];

  test("renders the table header correctly", () => {
    render(<TransactionsTable data={[]} />);

    expect(screen.getByText(TEXTS.TRANSACTIONS)).toBeInTheDocument();
    expect(screen.getByText(TEXTS.TRANSACTION_ID)).toBeInTheDocument();
    expect(screen.getByText(TEXTS.CUSTOMER_NAME)).toBeInTheDocument();
    expect(screen.getByText(TEXTS.PURCHASE_DATE)).toBeInTheDocument();
    expect(screen.getByText(TEXTS.PRODUCT_PURCHASED)).toBeInTheDocument();
    expect(screen.getByText(TEXTS.PRICE)).toBeInTheDocument();
    expect(screen.getByText(TEXTS.REWARD_POINTS)).toBeInTheDocument();
  });

  test("handles invalid data gracefully", () => {
    render(<TransactionsTable data={mockData} />);

    // Check for the valid transaction data
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("$1200.00")).toBeInTheDocument();

    expect(screen.getByText("0")).toBeInTheDocument(); // Invalid date -> reward = 0

    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument(); // Invalid price -> reward = 0
  });

  test("displays a no transactions message when data is empty", () => {
    render(<TransactionsTable data={[]} />);
    expect(
      screen.getByText(TEXTS.NO_TRANSACTIONS_AVAILABLE)
    ).toBeInTheDocument();
  });
});

