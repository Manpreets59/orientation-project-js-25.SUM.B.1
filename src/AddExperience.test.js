import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddExperience from "./AddExperience";

// ✅ Mock fetch globally
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ id: 1 }),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("AddExperience", () => {
  it("renders all input fields", () => {
    render(<AddExperience />);
    expect(screen.getByPlaceholderText(/job title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/company/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/start date/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/end date/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/logo url/i)).toBeInTheDocument();
  });

  it("submits form and shows success message", async () => {
    render(<AddExperience />);

    fireEvent.change(screen.getByPlaceholderText(/job title/i), {
      target: { value: "Frontend Developer" },
    });
    fireEvent.change(screen.getByPlaceholderText(/company/i), {
      target: { value: "Awesome Inc" },
    });
    fireEvent.change(screen.getByPlaceholderText(/start date/i), {
      target: { value: "January 2023" },
    });
    fireEvent.change(screen.getByPlaceholderText(/end date/i), {
      target: { value: "Present" },
    });
    fireEvent.change(screen.getByPlaceholderText(/description/i), {
      target: { value: "Building cool UI" },
    });
    fireEvent.change(screen.getByPlaceholderText(/logo url/i), {
      target: { value: "logo.png" },
    });

    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() =>
      expect(screen.getByText(/experience added! ID: 1/i)).toBeInTheDocument()
    );
  });
});
