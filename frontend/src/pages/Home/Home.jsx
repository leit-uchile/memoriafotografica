import React, { Fragment } from "react";
import { connect } from "react-redux";
import { gallery, site_misc } from "../../actions";
import { Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import Gallery from "react-photo-gallery";
import { LeitSpinner, Pagination } from "../../components";
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
import useHome from "./hooks/useHome";

/**
 * Home
 *
 * DISPLAYS Photos as the result of a search, and
 * allow to search using categories, metadata,
 * and time sort using FilterPicker and Redux's store Metadata
 */

const Home = (props) => {
  const [state, setState, handleOnClick, setPage, mapped] = useHome(props);

  // TODO: Fix logic for Photo redirect
  if (state.redirect) {
    props.setRoute("/photo"); // For NavLink in Navbar
    props.setSelectedId(state.chosenPhotoIndex); // For in photo navigation
    props.setPhotoPagination(state.photoPagination);

    var url = "?" + state.filters;
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
                <AdvancedSearch
                  onSubmit={(f) => {
                    setState({ ...state, filters: f });
                  }}
                />
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
              {props.loadingPhotos ? (
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
              {props.loadingPhotos && (
                <Pagination
                  count={props.count}
                  page_size={state.photoPagination.maxAllowed}
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
      getPhotos: gallery.photos.home,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(Home);
