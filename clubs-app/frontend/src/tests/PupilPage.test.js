import React from "react";
import { render } from "@testing-library/react";
import PupilPage from "../components/PupilPage";

describe("PupilPage Component", () => {
  test("renders without crashing", () => {
    // Render the PupilPage component
    render(<PupilPage handleLogout={() => {}} />);
  });
});

test("renders logout button", () => {
  // Render the PupilPage component
  const { getByText } = render(<PupilPage handleLogout={() => {}} />);
  
  // Get a reference to the logout button
  const logoutButton = getByText("Log Out");

  // Assert that the logout button is rendered
  expect(logoutButton).toBeInTheDocument();
});
