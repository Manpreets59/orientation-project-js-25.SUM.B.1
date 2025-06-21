import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";


test("renders Resume Builder heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/Resume Builder/i);
  expect(headingElement).toBeInTheDocument();
});

test("renders user info input fields", () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Phone/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/LinkedIn URL/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/GitHub URL/i)).toBeInTheDocument();
});

test("displays user info in resume section after input", () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText(/Name/i), { target: { value: "John Doe" } });
  fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: "john@example.com" } });
  fireEvent.change(screen.getByPlaceholderText(/Phone/i), { target: { value: "123-456-7890" } });
  fireEvent.change(screen.getByPlaceholderText(/LinkedIn URL/i), { target: { value: "linkedin.com/in/johndoe" } });
  fireEvent.change(screen.getByPlaceholderText(/GitHub URL/i), { target: { value: "github.com/johndoe" } });

  expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
  expect(screen.getByText(/123-456-7890/i)).toBeInTheDocument();
  expect(screen.getByText(/linkedin.com\/in\/johndoe/i)).toBeInTheDocument();
  expect(screen.getByText(/github.com\/johndoe/i)).toBeInTheDocument();
});
