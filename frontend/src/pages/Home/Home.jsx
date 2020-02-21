import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { home, misc, search } from "../../actions";
import { Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Gallery from "react-photo-gallery";
import LeitSpinner from "../../components/LeitSpinner";
import FilterPicker from "./FilterPicker";
import HomePagination from "./HomePagination";

/**
 * Home
 *
 * DISPLAYS Photos as the result of a search, and
 * allow to search using categories, metadata,
 * and time sort using FilterPicker and Redux's store Metadata
 */
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoPagination: {
        page: 0,
        maxAllowed: 10
      },
      maxAllowedCategories: 8,
      sortOpen: false,
      chosenPhotoIndex: 0, // For redirect
      redirect: false,
      link: ""
    };

    // componentWillLoad
    this.props.setRoute("/gallery/");
    this.props.onLoadGetPhotos();
  }

  handleOnClick = obj => {
    this.setState({ redirect: true, chosenPhotoIndex: obj.index });
  };

  resetHomePagination = () => {
    this.setState({
      photoPagination: {
        maxAllowed: this.state.photoPagination.maxAllowed,
        page: 0
      }
    });
  };

  /**
   * Method for HomePagination
   */
  setPage = number => {
    this.setState({
      photoPagination: {
        maxAllowed: this.state.photoPagination.maxAllowed,
        page: number
      }
    });
  };

  render() {
    const { photos, filters, loadingPhotos } = this.props;
    const { maxAllowed, page } = this.state.photoPagination;
    const pageLimit = Math.floor(photos.length / maxAllowed);

    // For gallery
    var mapped = photos
      .slice(page * maxAllowed, (page + 1) * maxAllowed)
      .map(el => ({
        src: el.thumbnail,
        height: el.aspect_h,
        width: el.aspect_w,
        id: el.id
      }));

    if (this.state.redirect) {
      this.props.setRoute("/photo/"); // For NavLink in Navbar
      this.props.setSelectedId(this.state.chosenPhotoIndex); // For in photo navigation
      this.props.setPhotoPagination(this.state.photoPagination);
      return (
        <Redirect
          push
          to={`/photo/${mapped[this.state.chosenPhotoIndex].id}`}
        />
      );
    }

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
        <div style={styles.galleryMenu}>
          <Container>
            <Row>
              <Col md="7" lg="9">
                <div style={styles.filtersContainer}>
                  {filters.length !== 0 ? (
                    filters.map(el => (
                      <span
                        key={el.metaID}
                        style={styles.tags}
                        onClick={() =>
                          this.props.removeSearch(el.metaID, el.value)
                        }
                      >
                        #{el.value} <FontAwesomeIcon icon={faTimesCircle} />
                      </span>
                    ))
                  ) : (
                    <h2> Todas las fotograf&iacute;as</h2>
                  )}
                </div>
              </Col>
              <Col md="5" lg="3">
                <FilterPicker
                  resetHomePagination={this.resetHomePagination}
                  defaultMaxAllowed={this.state.maxAllowedCategories}
                />
              </Col>
            </Row>
          </Container>
        </div>
        <Container fluid style={styles.galleryContainer}>
          <Row>
            <Col>
              {loadingPhotos ? (
                <LeitSpinner />
              ) : (
                <Gallery
                  photos={mapped}
                  targetRowHeight={200}
                  onClick={(e, index) => this.handleOnClick(index)}
                />
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: "2em" }}>
            <Col>
              <HomePagination
                pageLimit={pageLimit}
                page={this.state.photoPagination.page}
                setStatePage={this.setPage}
                nbPhotos={this.props.photos.length}
                maxAllowed={this.state.photoPagination.maxAllowed}
              />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

const styles = {
  galleryMenu: {
    margin: "0 auto",
    borderBottom: "1px solid rgb(210,214,218)",
    background: "white",
    position: "sticky",
    top: "4em",
    zIndex: "2"
  },
  galleryContainer: {
    width: "100%",
    minHeight: "100vh",
    padding: "1.25em 3.1em",
    backgroundColor: "#f7f8fa",
    textAlign: "center",
    marginBottom: "-2em"
  },
  filtersContainer: {
    paddingTop: "1em",
    display: "flex",
    alignItems: "left",
    verticalAlign: "middle",
    flexDirection: "row"
  },
  tags: {
    color: "white",
    borderRadius: "10px",
    backgroundColor: "#9a9e9d",
    margin: "2px",
    padding: "4px 12px 4px 12px"
  }
};

const mapStateToProps = state => ({
  photos: state.home.photos,
  filters: state.search.metaIDs,
  auth: state.auth.token,
  loadingPhotos: state.home.loading
});

const mapActionsToProps = dispatch => ({
  onLoadGetPhotos: () => dispatch(home.home()),
  setRoute: route => dispatch(misc.setCurrentRoute(route)),
  removeSearch: (id, value) => dispatch(search.removeSearchItem(id, value)),
  // TODO: use it!
  // eslint-disable-next-line
  setSelectedId: id => dispatch(home.setSelectedId(id)),
  setPhotoPagination: obj => dispatch(home.setPhotoPagination(obj))
});

export default connect(mapStateToProps, mapActionsToProps)(Home);
