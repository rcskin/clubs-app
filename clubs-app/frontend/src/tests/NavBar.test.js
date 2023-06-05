import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

describe("NavBar", () => {
  test("renders NavBar component with correct links", () => {
    // Render the NavBar component within a BrowserRouter for routing
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    // Get references to the dashboard and clubs links
    const dashboardLink = screen.getByText("Pupil Dashboard");
    const clubsLink = screen.getByText("Joined Clubs");

    // Assert that the links are rendered in the NavBar component
    expect(dashboardLink).toBeInTheDocument();
    expect(clubsLink).toBeInTheDocument();

    // Assert that the href attribute of the links is set correctly
    expect(dashboardLink.getAttribute("href")).toBe("/");
    expect(clubsLink.getAttribute("href")).toBe("/joined-clubs");
  });
});
