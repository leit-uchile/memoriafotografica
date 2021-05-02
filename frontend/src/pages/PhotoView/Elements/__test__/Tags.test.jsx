import React from "react";
import "@testing-library/jest-dom";
import { renderWithRouter, screen } from "../../../../test/test-utils";
import userEvent from "@testing-library/user-event";
import Tags from "../Tags";

const tags = [
  { id: 1, value: "beauchef" },
  { id: 100, value: "beauchef851" },
];

it("renders without crashing", () => {
  renderWithRouter(<Tags tags={tags} photoId={1} onRedirect={() => {}} />);
  expect(screen.getByText("#beauchef"));
  expect(screen.getByText("#beauchef851"));
});

it("Check click on tags", () => {
  const redirectMock = jest.fn((_1, _2) => {});
  renderWithRouter(<Tags tags={tags} photoId={1} onRedirect={redirectMock} />);
  
  userEvent.click(screen.getByText("#beauchef851"));
  expect(redirectMock).toHaveBeenLastCalledWith(100, "beauchef851");
  userEvent.click(screen.getByText("#beauchef"));
  expect(redirectMock).toHaveBeenLastCalledWith(1, "beauchef");
});
