import { useState, useEffect, useMemo } from "react";
import { gallery } from "../../../actions";

const useHome = (props) => {
  const [state, setState] = useState({
    photoPagination: {
      page: 0,
      maxAllowed: 25, // MASTER CONFIG
    },
    sortOpen: false,
    chosenPhotoIndex: 0, // For redirect
    redirect: false,
    link: "",
    // TODO: Add default filter
    filters: "",
  });

  useEffect(() => {
    props.setRoute("/gallery");
    // TODO: Add get photos call to action
    props.getPhotos(
      state.photoPagination.page,
      state.photoPagination.maxAllowed
    );
  }, []);

  // TODO Add recall logic on filters
  useEffect(() => {
    // TODO: Add get photos call to action
    // TODO: Reset pagination on updated filters
    props.getPhotos(0, state.photoPagination.maxAllowed, state.filters);
    resetHomePagination();
  }, [state.filters]);

  const handleOnClick = (obj) => {
    setState({
      ...state,
      redirect: true,
      chosenPhotoIndex: obj.index,
    });
  };

  const resetHomePagination = () => {
    setState({
      ...state,
      photoPagination: {
        maxAllowed: state.photoPagination.maxAllowed,
        page: 0,
      },
    });
  };

  /**
   * Method for HomePagination
   */
  const setPage = (number) => {
    setState({
      ...state,
      photoPagination: {
        maxAllowed: state.photoPagination.maxAllowed,
        page: number,
      },
    });
  };

  // For gallery
  var mapped = useMemo(
    () =>
      props.photos.map((el) => ({
        src: el.thumbnail,
        height: el.aspect_h,
        width: el.aspect_w,
        id: el.id,
      })),
    [props.photos]
  );

  return [
    state,
    setState,
    handleOnClick,
    setPage,
    mapped,
  ];
};

export default useHome;