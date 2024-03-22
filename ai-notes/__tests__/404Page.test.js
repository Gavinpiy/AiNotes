import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NotFound from "ai-notes/src/app/not-found.tsx";
import '@prisma/client';

jest.mock('@prisma/client');

describe("404 Page", () => {
  it("renders error text", () => {
    render(<NotFound />);

    const heading = screen.getByText("Oops, an Error Occured");
    expect(heading).toBeInTheDocument();
  });
});


