import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { renderWithRouter, screen } from "../../../../test/test-utils";
import SuggestionTable from "../Suggestions/SuggestionTable";
import * as suggestions from "../../../../test/data/tagsugesstions.json"


it("renders without crashing", () => {
  renderWithRouter(
    <SuggestionTable
      suggestions={suggestions}
      setSugSelected={() => {}}
      sugSelected={{}}
    />
  );

  expect(screen.getByText("#beauchef851 (5)"));
  expect(screen.getByText("#moderno (1)"));
  expect(screen.getByText("#beauchef850 (2)"));
});

it("Check Click in tag", () => {
  const selectTagMock = jest.fn((_) => {});

  renderWithRouter(
    <SuggestionTable
      suggestions={suggestions}
      setSugSelected={selectTagMock}
      sugSelected={{}}
    />
  );

  // sequence of click
  userEvent.click(screen.getByText("#moderno (1)"));
  userEvent.click(screen.getByText("#beauchef851 (5)"));
  userEvent.click(screen.getByText("#beauchef850 (2)"));
  userEvent.click(screen.getByText("#beauchef851 (5)"));

  expect(selectTagMock).toHaveBeenNthCalledWith(1, { 2: true });
  expect(selectTagMock).toHaveBeenNthCalledWith(2, { 1: true, 2: true });
  expect(selectTagMock).toHaveBeenNthCalledWith(3, { 3: true, 2: true, 1: true });
  expect(selectTagMock).toHaveBeenNthCalledWith(4, { 2: true, 3: true });

});
