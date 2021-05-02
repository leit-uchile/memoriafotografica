import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { site_misc } from "../../actions";
import { Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import Gallery from "react-photo-gallery";
import { LeitSpinner, Pagination } from "../../components";
import FilterPicker from "./FilterPicker";
import { bindActionCreators } from "redux";
import {
  selectPhotos,
  selectPhotosCount,
  selectSiteMiscSearchMetaIDS,
  selectSiteMiscHomeLoading,
  selectUserToken,
} from "../../reducers";
import "./home.css";
import AdvancedSearch from "./AdvancedSearch";

/**
 * Home
 *
 * DISPLAYS Photos as the result of a search, and
 * allow to search using categories, metadata,
 * and time sort using FilterPicker and Redux's store Metadata
 */

const Home = (props) => {

  // BIGTODO: Put all logic on a hook called useHome

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
    filters: ""
  });

  useEffect(() => {
    props.setRoute("/gallery");
    // TODO: Add get photos call to action
  }, []);

  // TODO Add recall logic on filters
  useEffect(() => {
    // TODO: Add get photos call to action
    // TODO: Reset pagination on updated filters
  }, [state.filters])

  // Add filters to search method
  const putFilterInfo = (o) => {
    setState({
      ...state,
      catIds: o.cats,
      sorting: o.sorting,
    });
  };

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

  const { photos, filters, loadingPhotos, count } = props;
  const { maxAllowed } = state.photoPagination;

  // TODO: Add useMemo (See React documentation)
  // For gallery
  var mapped = photos.map((el) => ({
    src: el.thumbnail,
    height: el.aspect_h,
    width: el.aspect_w,
    id: el.id,
  }));

  // TODO: Fix logic for Photo redirect
  if (state.redirect) {
    props.setRoute("/photo"); // For NavLink in Navbar
    props.setSelectedId(state.chosenPhotoIndex); // For in photo navigation
    props.setPhotoPagination(state.photoPagination);

    var url = "?";
    url = url + "sort=" + state.sorting;
    url =
      state.catIds.length === 0
        ? url
        : url + "&category=" + state.catIds.join(",");
    url =
      props.filters.length === 0
        ? url
        : url + "&metadata=" + props.filters.map((el) => el.metaID).join(",");
    setState({
      ...state,
      redirect: false,
    });
    return (
      <Redirect
        push
        to={`/photo/${mapped[state.chosenPhotoIndex].id}/${url}`}
      />
    );
  }

  // TODO: Add update filters method to Advanced search
  return (
    <Fragment>
      <Helmet>
        <meta property="og:title" content="Buscar fotografias" />
        <meta property="og:type" content="Motor de búsqueda" />
        <meta
          property="og:url"
          content=" http://memoriafotografica.ing.fcfm.cl/"
        />
        <meta property="og:image" content=" http://example.com/image.jpg" />
        <meta property="og:description" content="Descripcion" />
        <title>Buscar fotografias</title>
      </Helmet>
      <div className="home-gallery-menu">
        <Container>
          <Row>
            <Col md="7" lg="12">
              <div className="home-filters-containers">
                <h2> Todas las fotograf&iacute;as</h2>
                <Col md={{ offset: 7 }}>
                  <AdvancedSearch />
                </Col>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="home-background">
        <Container className="home-gallery-container">
          <Row>
            <Col
              sm={mapped.length === 1 ? { size: 4, offset: 4 } : { size: 12 }}
            >
              {loadingPhotos ? (
                <LeitSpinner />
              ) : (
                <Gallery
                  photos={mapped}
                  targetRowHeight={200}
                  onClick={(e, index) => handleOnClick(index)}
                  className="additional"
                />
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: "2em" }}>
            <Col>
              {loadingPhotos && (
                <Pagination
                  count={count}
                  page_size={maxAllowed}
                  page={state.photoPagination.page}
                  setStatePage={setPage}
                  size="lg"
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  photos: selectPhotos(state),
  count: selectPhotosCount(state),
  filters: selectSiteMiscSearchMetaIDS(state),
  auth: selectUserToken(state),
  loadingPhotos: selectSiteMiscHomeLoading(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      setRoute: site_misc.setCurrentRoute,
      removeSearch: site_misc.removeSearchItem,
      // TODO: use it!
      // eslint-disable-next-line
      setSelectedId: site_misc.setSelectedId,
      setPhotoPagination: site_misc.setPhotoPagination,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(Home);
