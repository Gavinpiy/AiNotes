import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../src/app/page.tsx";

describe("landing page renders", () => {
  it("renders a heading", () => {
    render(<Home />);
    const paragraph = screen.getByText(
      "Notes Application with AI. Built with Next.js, OpenAI, Tailwind CSS, and Clerk.",
    );
    expect(paragraph).toBeInTheDocument();
  });
});
