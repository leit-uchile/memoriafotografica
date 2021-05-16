import { rest } from "msw";
import { getAlbum, getNews, getPictures } from "./rest-helpers";

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

  rest.post("/api/tagsuggestion/", (req, res, ctx) => {
    let meta = JSON.parse(req.body);
    meta = meta.map((m) => m.metadata);
    return res(
      ctx.status(200),
      ctx.json({ count: meta.length, results: meta })
    );
  }),

  rest.post("/api/metadata/", (req, res, ctx) => {    
    let meta = req.body.meta.map((index, m) => {
      return { id: index, metadata: m.metadata };
    });

    return res(
      ctx.status(200),
      ctx.json(meta)
    );
  }),
];

export { handlers };
