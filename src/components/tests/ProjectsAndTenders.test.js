// ProjectsAndTenders.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import ProjectsAndTenders from "../../pages/Projects_Tenders";

// Mock fetch to simulate API responses
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          _id: "1",
          title: "Construction of Highway",
          country: "Uzbekistan",
          sector: "Infrastructure",
          status: "Open",
          deadline: "2024-01-01",
          description: "Construction of a new highway in Uzbekistan.",
          documents: ["document1.pdf"],
        },
        {
          _id: "2",
          title: "Solar Power Plant",
          country: "India",
          sector: "Energy",
          status: "Closed",
          deadline: "2023-12-31",
          description: "Development of a solar power plant in India.",
        },
      ]),
  })
);

afterEach(() => {
  fetch.mockClear();
});

// Correct way to mock `useNavigate`
jest.mock("react-router-dom", () => {
  const actualReactRouterDom = jest.requireActual("react-router-dom");
  return {
    ...actualReactRouterDom,
    useNavigate: () => jest.fn(), // Use a function directly inside the mock
  };
});

test("renders the Projects & Tenders component and displays tenders", async () => {
  render(
    <BrowserRouter>
      <ProjectsAndTenders />
    </BrowserRouter>
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText("Construction of Highway")).toBeInTheDocument();
    expect(screen.getByText("Solar Power Plant")).toBeInTheDocument();
  });

  expect(
    screen.getByText(
      "Country: Uzbekistan | Sector: Infrastructure | Status: Open | Deadline: 2024-01-01"
    )
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      "Country: India | Sector: Energy | Status: Closed | Deadline: 2023-12-31"
    )
  ).toBeInTheDocument();

  expect(screen.getByText(/download document/i)).toBeInTheDocument();
});
