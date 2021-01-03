import React from "react";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { renderWithRouter, screen, waitFor } from "../../../test-utils";
import AllCollections from "../";

const server = setupServer(
  rest.get("/api/albums/?page=1&page_size=10", (req, res, ctx) => {
    return res(
      ctx.json({
        count: 1,
        results: [
          {
            id: 1,
            name: "title",
            description: "description",
            updated_at: "2020-09-16T11:13:31-03:00",
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it("renders without crashing", async () => {
  renderWithRouter(<AllCollections />);
  await waitFor(() => expect(screen.getByText("title")));
  expect(screen.getByLabelText("generic page navigation"));
});
