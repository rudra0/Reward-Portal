import { render, screen } from "@testing-library/react";
import TotalRewardsTable from "../components/table/totalRewardsTable";
import { calculateRewards } from "../utils/calculateRewards";
import { TEXTS } from "../constants/textConstants";

jest.mock("../utils/calculateRewards");

describe("TotalRewardsTable Component", () => {
  it("renders the table headers correctly", () => {
    render(<TotalRewardsTable data={[]} />);
    expect(screen.getByText(TEXTS.CUSTOMER_NAME)).toBeInTheDocument();
    expect(screen.getByText(TEXTS.TOTAL_REWARDS)).toBeInTheDocument();
  });

  it("displays the correct reward points for valid data", () => {
    const data = [
      { customerName: "Alice", price: 120 },
      { customerName: "Bob", price: 80 },
    ];

    // Mock calculateRewards function to return expected values
    calculateRewards.mockImplementation((price) => {
      if (price === 120) return 90;
      if (price === 80) return 30;
      return 0; // Default case
    });

    render(<TotalRewardsTable data={data} />);

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("90")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
  });

  it("handles invalid data gracefully", () => {
    const data = [
      { customerName: "Invalid Price", price: -10 },
      { customerName: "Negative Price", price: 0 },
      { customerName: "Malformed Date", price: "not-a-number" },
    ];

    // Mock calculateRewards to handle invalid data
    calculateRewards.mockImplementation((price) => {
      if (typeof price !== "number" || isNaN(price) || price <= 0) return 0;
      return price; // This is a placeholder logic for valid prices
    });

    render(<TotalRewardsTable data={data} />);

    // Ensure each invalid customer shows '0' as reward points
    expect(screen.getByText("Invalid Price")).toBeInTheDocument();
    expect(screen.getAllByText("0")).toHaveLength(3);
    expect(screen.getByText("Negative Price")).toBeInTheDocument();
    expect(screen.getByText("Malformed Date")).toBeInTheDocument();
  });

  it("displays a no rewards message when data is empty", () => {
    render(<TotalRewardsTable data={[]} />);
    expect(
      screen.getByText(TEXTS.NO_TOTAL_REWARDS_AVAILABLE)
    ).toBeInTheDocument();
  });
});
