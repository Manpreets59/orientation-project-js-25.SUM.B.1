import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogoDropzone from "./LogoDropzone";

// ✅ Mock fetch to avoid jsdom error during tests
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("LogoDropzone", () => {
  it("renders instruction text", () => {
    render(<LogoDropzone />);
    expect(
      screen.getByText(/drag and drop your logo here/i)
    ).toBeInTheDocument();
  });

  it("accepts file upload", async () => {
    render(<LogoDropzone />);
    const input = screen.getByTestId("file-input");

    const file = new File(["dummy content"], "logo.png", { type: "image/png" });
    await userEvent.upload(input, file);

    expect(input.files[0]).toBe(file);
    expect(input.files.item(0).name).toBe("logo.png");
  });
});
