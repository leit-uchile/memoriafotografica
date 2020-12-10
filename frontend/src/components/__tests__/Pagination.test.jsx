import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Pagination from "../Pagination";

it("renders without crashing", () => {
  render(
    <Pagination
      maxPageProp={2}
      page={1}
      count={10}
      page_size={5}
      setStatePage={() => {}}
      size={"sm"}
    />
  );
  expect(screen.getByText("1"));
  expect(screen.getByText("2"));
});
