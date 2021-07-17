import React from "react";
import "@testing-library/jest-dom";

import {
  renderWithRouter,
  screen,
  waitForElementToBeRemoved,
} from "../../../../test/test-utils";
import userEvent from "@testing-library/user-event";
import { server, rest } from "../../../../test/server";
import CommentHandler from "../CommentHandler";
import * as comments from "../../../../test/data/comments.json";

it("renders without crashing", async () => {
  renderWithRouter(<CommentHandler id={1} />, {
    initialState: {
      user: {
        isAuthenticated: true,
        userData: {
          id: 1,
          first_name: "User",
          last_name: "User",
          user_type: 1,
          isStaff: false,
        },
      },
    },
  });
  expect(await screen.findByText("buena foto men")).toBeInTheDocument();
  expect(await screen.findByText("gracias man")).toBeInTheDocument();
  expect(await screen.findByText("Que locura!")).toBeInTheDocument();
});

it("Add comment", async () => {
  renderWithRouter(<CommentHandler id={1} />, {
    initialState: {
      user: {
        isAuthenticated: true,
        userData: {
          id: 1,
          first_name: "User",
          last_name: "User",
          user_type: 1,
          isStaff: false,
        },
      },
    },
  });

  expect(await screen.findByText("gracias man")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Comentario ..."));

  userEvent.type(
    screen.getByPlaceholderText("Comentario ..."),
    `Muy buenos recuerdos{enter}`
  );

  server.use(
    rest.get("/api/photos/:id/comments/", (_, res, ctx) => {
      let results = comments.results;

      let newComment = {
        id: 4,
        content: "Muy buenos recuerdos",
        created_at: "2021-07-03T15:00:49.700697-04:00",
        updated_at: "2021-07-03T15:00:49.700707-04:00",
        usuario: {
          id: 1,
          first_name: "User",
          last_name: "User",
          user_type: 1,
          generation: "",
          avatar: null,
          rol_type: "Externo",
        },
      };

      return res(
        ctx.status(200),
        ctx.json({
          count: 3,
          next: null,
          previous: null,
          results: [...results, newComment],
        })
      );
    })
  );

  await waitForElementToBeRemoved(() => screen.queryByText("Cargando..."));
  expect(await screen.findByText("Muy buenos recuerdos")).toBeInTheDocument();
});

it("Cancel edit comment", async () => {
  renderWithRouter(<CommentHandler id={1} />, {
    initialState: {
      user: {
        isAuthenticated: true,
        userData: {
          id: 2,
          first_name: "Usuario1",
          last_name: "Colaborador",
          user_type: 1,
          isStaff: false,
        },
      },
    },
  });

  await screen.findByText("buena foto men");
  userEvent.click(screen.getByTitle("Editar"));

  userEvent.type(
    screen.getByDisplayValue("buena foto men"),
    `{backspace}{backspace}an{enter}`
  );

  userEvent.click(screen.getByText("Descartar"));

  expect(await screen.findByText("buena foto men")).toBeInTheDocument();
  expect(
    await screen.queryByText("Editado el 03/07/2021 a las 09:00", {
      exact: false,
    })
  ).not.toBeInTheDocument();
});

it("Edit comment", async () => {
  renderWithRouter(<CommentHandler id={1} />, {
    initialState: {
      user: {
        isAuthenticated: true,
        userData: {
          id: 2,
          first_name: "Usuario1",
          last_name: "Colaborador",
          user_type: 1,
          isStaff: false,
        },
      },
    },
  });

  await screen.findByText("buena foto men");
  userEvent.click(screen.getByTitle("Editar"));

  userEvent.type(
    screen.getByDisplayValue("buena foto men"),
    `{backspace}{backspace}an{enter}`
  );

  userEvent.click(screen.getByText("Guardar"));

  server.use(
    rest.get("/api/photos/:id/comments/", (_, res, ctx) => {
      let editedComment = {
        id: 1,
        content: "buena foto man",
        created_at: "2021-07-03T12:57:49.580697-04:00",
        updated_at: "2021-07-03T17:00:49.700707-04:00",
        usuario: {
          id: 2,
          first_name: "Usuario1",
          last_name: "Colaborador",
          generation: "",
          avatar: null,
          rol_type: "Externo",
        },
      };

      return res(
        ctx.status(200),
        ctx.json({
          count: 2,
          next: null,
          previous: null,
          results: [editedComment, comments.results[1], comments.results[2]],
        })
      );
    })
  );

  expect(await screen.findByText("buena foto man")).toBeInTheDocument();
  expect(
    await screen.findByText("Editado el 03/07/2021 a las 09:00", {
      exact: false,
    })
  ).toBeInTheDocument();
});

it("Delete comment", async () => {
  renderWithRouter(<CommentHandler id={1} />, {
    initialState: {
      user: {
        isAuthenticated: true,
        userData: {
          id: 3,
          first_name: "Usuario2",
          last_name: "Colaborador",
          user_type: 1,
          isStaff: false,
        },
      },
    },
  });

  await screen.findByText("gracias man");
  userEvent.click(screen.getByTitle("Eliminar"));

  server.use(
    rest.get("/api/photos/:id/comments/", (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          count: 1,
          next: null,
          previous: null,
          results: [comments.results[0], comments.results[2]],
        })
      );
    })
  );

  await waitForElementToBeRemoved(() => screen.queryByText("gracias man"));

  expect(await screen.findByText("buena foto men")).toBeInTheDocument();
  expect(await screen.findByText("Que locura!")).toBeInTheDocument();
});

it("report comment", async () => {
  renderWithRouter(<CommentHandler id={1} />, {
    initialState: {
      user: {
        isAuthenticated: true,
        userData: {
          id: 3,
          first_name: "Usuario2",
          last_name: "Colaborador",
          user_type: 1,
          isStaff: false,
        },
      },
    },
  });

  expect(await screen.findByText("buena foto men")).toBeInTheDocument();
  expect(await screen.findByText("gracias man")).toBeInTheDocument();
  expect(await screen.findByText("Que locura!")).toBeInTheDocument();

  let report = jest.fn((_id, _content) => {
    return { id: _id, content: _content };
  });

  server.use(
    rest.post("/api/reports/", (req, res, ctx) => {
      report(req.body.id, req.body.content);
      return res(
        ctx.status(201),
        ctx.json({
          id: 1,
          content_id: { id: 1, content: "buena foto men" },
          content: req.body.content,
          resolved: false,
          resolution_details: "",
          created_at: "2021-07-03T21:00:15.762979-04:00",
          updated_at: "2021-07-03T21:00:15.762984-04:00",
          type: 3,
        })
      );
    })
  );


  expect(await screen.findByText("Que locura!")).toBeInTheDocument();
  let reportableComments = screen.queryAllByTitle("Comentario inapropiado");
  expect(reportableComments).toHaveLength(2);

  userEvent.click(reportableComments[0]);
  expect(await screen.findByText("Reportar Comentario")).toBeInTheDocument();
  userEvent.click(screen.getByText("Contenido inapropiado"));
  userEvent.click(screen.getByRole("button", { name: "Reportar" }));
  
  await waitForElementToBeRemoved(() => screen.queryByText("Enviando reporte"));
  expect(await screen.findByText("¡Reporte enviado!", {exact: false})).toBeInTheDocument();
  expect(report).toHaveBeenLastCalledWith(1, "Contenido inapropiado");

  userEvent.click(screen.getByRole("button", {name: "Cerrar"}));

  userEvent.click(reportableComments[1]);
  expect(await screen.findByText("Reportar Comentario")).toBeInTheDocument();
  userEvent.click(screen.getByText("Incita a la violencia"));  
  expect(await screen.findByRole("button", {name: "Reportar"})).toBeInTheDocument();
  userEvent.click(screen.getByRole("button", { name: "Reportar"}));
  
  await waitForElementToBeRemoved(() => screen.queryByText("Enviando reporte"));
  expect(await screen.findByText("¡Reporte enviado!", {exact: false})).toBeInTheDocument();
  expect(report).toHaveBeenLastCalledWith(3, "Incita a la violencia");

});
