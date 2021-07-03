import { rest } from "msw";
import { getAlbum, getNews, getPictures } from "./rest-helpers";
import * as tagsuggestions from "./data/tagsugesstions.json";
import * as comments from "./data/comments.json";

/**
 * REST handlers to mock the app API
 */
const handlers = [
  rest.get("/api/albums/:id/", (req, res, ctx) => {
    const getCollections = req.url.searchParams.getAll("collections")[0];
    const getDetailed = req.url.searchParams.getAll("detailed")[0];
    if (getCollections === "1") {
      let collection = getAlbum("collection title", true, 1);
      if (getDetailed === "y") {
        collection["pictures"] = getPictures(true, 5);
        return res(ctx.json(collection));
      } else {
        return res(ctx.json(collection));
      }
    } else {
      let album = getAlbum("title", false, 1);
      if (getDetailed === "y") {
        album["pictures"] = getPictures(true, 5);
        return res(ctx.json(album));
      } else {
        return res(ctx.json(album));
      }
    }
  }),
  rest.get("/api/albums/", (req, res, ctx) => {
    const getCollections = req.url.searchParams.getAll("collections")[0];
    const getDetailed = req.url.searchParams.getAll("detailed")[0];
    if (getCollections === "1") {
      let collection = getAlbum("collection title", true, 1);
      if (getDetailed === "y") {
        collection["pictures"] = getPictures(true, 5);
        return res(ctx.json(collection));
      } else {
        return res(
          ctx.json({
            count: 1,
            results: [collection],
          })
        );
      }
    } else {
      let album = getAlbum("title", false, 1);
      if (getDetailed === "y") {
        album["pictures"] = getPictures(true, 5);
        return res(ctx.json(album));
      } else {
        return res(
          ctx.json({
            count: 1,
            results: [album],
          })
        );
      }
    }
  }),
  rest.get("/api/photos/", (req, res, ctx) => {
    return res(
      ctx.json({
        count: 5,
        results: getPictures(true, 5),
      })
    );
  }),
  rest.get("/api/news/", (req, res, ctx) => {
    return res(
      ctx.json({
        count: 5,
        results: getNews(5),
      })
    );
  }),
  rest.get("/api/caroussel/", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          news: getNews(3),
        },
      ])
    );
  }),
  rest.post("/api/auth/login/", (req, res, ctx) => {
    return res(
      ctx.status(400),
      ctx.json({ message: `${req.body.email} no esta registrado` })
    );
  }),

  rest.post("/api/metadata/", (req, res, ctx) => {
    let meta = req.body.map((m, index) => {
      return { id: index, ...m };
    });
    return res(ctx.status(201), ctx.json(meta));
  }),

  rest.get("/api/metadata/", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ count: 0, next: null, previous: null, results: [] })
    );
  }),

  rest.post("/api/metadata/", (req, res, ctx) => {
    let meta = req.body.map((m, index) => {
      return { id: index, ...m };
    });
    return res(ctx.status(201), ctx.json(meta));
  }),

  rest.post("/api/tagsuggestion/", (req, res, ctx) => {
    let meta = req.body;
    return res(ctx.status(201), ctx.json(meta));
  }),

  rest.get("/api/tagsuggestion/", (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ count: tagsuggestions.count, results: tagsuggestions.results })
    );
  }),

  rest.get("/api/photos/:id/comments/", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(comments));
  }),


];

export { handlers };
