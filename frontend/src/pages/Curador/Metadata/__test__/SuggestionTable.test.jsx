import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { renderWithRouter, screen } from "../../../../test/test-utils";
import SuggestionTable from "../Suggestions/SuggestionTable";

const suggestions = {
  count: 2,
  results: [
    {
      id: 1,
      thumbnail: "",
      tagsuggestion_photo: [
        {
          id: 1,
          metadata: {
            value: "beauchef851",
            id: 1,
          },
          votes: 5,
        },
        {
          id: 2,
          metadata: {
            value: "moderno",
            id: 2,
          },
          votes: 1,
        },
      ],
    },

    {
      id: 2,
      thumbnail: "",
      tagsuggestion_photo: [
        {
          id: 3,
          metadata: {
            value: "beauchef850",
            id: 3,
          },
          votes: 2,
        },
      ],
    },
  ],
};

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
