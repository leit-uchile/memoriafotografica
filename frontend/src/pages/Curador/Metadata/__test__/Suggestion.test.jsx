import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {
  renderWithRouter,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "../../../../test/test-utils";
import { server, rest } from "../../../../test/server";

import Suggestions from "../Suggestions/Suggestion";

it("render without crashing", async () => {
  renderWithRouter(<Suggestions active={true} />);
  expect(await screen.findByText("#beauchef851 (5)")).toBeInTheDocument();
  expect(await screen.findByText("#moderno (1)")).toBeInTheDocument();
  expect(await screen.findByText("#beauchef850 (2)")).toBeInTheDocument();
});

it("no suggestions available", async () => {
  server.use(
    rest.get(`/api/tagsuggestion/`, async (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ count: 0, results: [] }));
    })
  );
  renderWithRouter(<Suggestions active={true} />);
  expect(await screen.queryByText("#beauchef851 (5)")).toBeNull();
  expect(
    await screen.findByText("No hay Sugerencias disponibles")
  ).toBeInTheDocument();
});

it("approve and reject suggestions", async () => {
  const approveTagMock = jest.fn((_1, _2) => {});

  renderWithRouter(<Suggestions active={true} />);

  await screen.findByText("#beauchef851 (5)");
  await screen.findByText("#beauchef850 (2)");

  let aceptarButton = await screen.getByRole("button", {
    name: /Aceptar/i,
    exact: false,
  });

  userEvent.click(screen.getByText("#beauchef850 (2)"));
  userEvent.click(screen.getByText("#beauchef851 (5)"));

  server.use(
    rest.put(`/api/tagsuggestion/approve/:id`, async (req, res, ctx) => {
      approveTagMock(req.params.id, req.body.approve);
      return res(ctx.status(202));
    })
  );

  server.use(
    rest.get("/api/tagsuggestion/", async (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          count: 1,
          results: [
            {
              id: 1,
              thumbnail: "",
              tagsuggestion_photo: [
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
          ],
        })
      );
    })
  );

  userEvent.click(aceptarButton);

  await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
  await waitFor(() => expect(approveTagMock).toHaveBeenCalledWith("1", 1));
  await waitFor(() => expect(approveTagMock).toHaveBeenCalledWith("3", 1));
  
  await waitFor(() => expect(screen.queryByText("#beauchef851 (5)")).not.toBeInTheDocument());
  await waitFor(() => expect(screen.queryByText("#beauchef850 (2)")).not.toBeInTheDocument());
  await waitFor(() => expect(screen.queryByText("#moderno (1)")).toBeInTheDocument());
  
  let rechazarButton = await screen.getByRole("button", {
    name: /Eliminar/i,
    exact: false,
  });

  userEvent.click(screen.getByText("#moderno (1)"));
  userEvent.click(rechazarButton);
  await waitFor(() => expect(approveTagMock).toHaveBeenCalledWith("2", 0));
});
