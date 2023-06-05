import React, { useState, useEffect } from "react";
import { render, screen } from "@testing-library/react";
import AdminDashboard from "../components/AdminDashboard";

describe("AdminDashboard", () => {
  const handleLogoutMock = jest.fn();

  beforeEach(() => {
    render(<AdminDashboard handleLogout={handleLogoutMock} />);
  });

  test("renders the AdminDashboard component", () => {
    // Assert that the component is rendered
    const adminDashboardElement = screen.getByText("Hello Admin!");
    expect(adminDashboardElement).toBeInTheDocument();

    // Assert that the logout button is rendered
    const logoutButtonElement = screen.getByText("Log Out");
    expect(logoutButtonElement).toBeInTheDocument();
  });

});

