import { useEffect, useState } from "react";

function useAlbumDetails(match, loadInfo, albumData) {
  // Load album info
  useEffect(() => {
    loadInfo(match.params.id, true);
  }, [match.params.id, loadInfo]);

  // Scroll up!
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  });

  // compute one time and store here
  const [display, setDisplay] = useState({
    photos: [],
    uploaded: "",
    redirect: false,
    timeline: true,
  });

  useEffect(() => {
    if (albumData !== null && albumData.pictures) {
      setDisplay({
        ...display,
        photos: albumData.pictures,
        uploaded: new Date(albumData.created_at).toLocaleDateString("es"),
        redirect: false,
      });
    }
  }, [albumData]);

  const handleOnClick = (id) => {
    setDisplay({ ...display, redirect: id });
  };

  const mapped = display.photos.map((el) => ({
    src: el.thumbnail,
    height: el.aspect_h,
    width: el.aspect_w,
    id: el.id,
  }));

  return [display, setDisplay, handleOnClick, mapped];
}

export default useAlbumDetails;
