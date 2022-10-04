import { afterEach, describe, it } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar Test", () => {
  it("should render Navbar comp", () => {
    render(<Navbar />);
  });

  /*   it("should render SearchBar comp", () => {
      const { get } = render(<Navbar />);
    }); */
});
