import { useState, useEffect } from "react";
import uuid4 from "uuid";

function useAlbumList(setRoute, albums, loadCollections) {
  const [params, setParams] = useState({
    name: "",
    redirectUrl: false,
  });

  const [rows, setRows] = useState([]);

  const [page, setPage] = useState({
    page: 0,
    page_size: 9,
  });

  const setDaPage = (p) => setPage((d) => ({ ...d, page: p }));

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  // Set user info and load the albums accordingly
  useEffect(() => {
    setRoute("/collections");
    let par = "&collections=1";
    par = params.name !== "" ? par + "&name=" + params.name : par;
    loadCollections(page.page, page.page_size, par);
    // eslint-disable-next-line
  }, [loadCollections, page]);

  useEffect(() => {
    let list = [];
    const albumslist = albums.results;
    for (let index = 0; index < albumslist.length; index = index + 3) {
      let cols = [];
      if (albumslist[index]) cols.push(albumslist[index]);
      if (albumslist[index + 1]) cols.push(albumslist[index + 1]);
      if (albumslist[index + 2]) cols.push(albumslist[index + 2]);
      cols.theKey = uuid4();
      list.push(cols);
    }
    setRows(list);
  }, [albums.results]);

  const formatDate = (d) => {
    var date = new Date(d);
    return date.toLocaleString();
  };

  const setRedirect = (id) => {
    setParams({
      ...params,
      redirectUrl: `/user/public/collections/${id}`,
    });
  };

  const onSearch = () => {
    setDaPage(0);
  };

  return [
    params,
    setParams,
    rows,
    page,
    setDaPage,
    formatDate,
    setRedirect,
    onSearch,
  ];
}

export default useAlbumList;
