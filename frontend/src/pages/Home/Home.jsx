import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { home, misc, search } from "../../actions";
import { Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Gallery from "react-photo-gallery";
import {LeitSpinner} from "../../components";
import FilterPicker from "./FilterPicker";
import HomePagination from "./HomePagination";
import "./home.css";

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
      maxAllowedCategories: 4,
      sortOpen: false,
      chosenPhotoIndex: 0, // For redirect
      redirect: false,
      link: ""
    };

    // componentWillLoad
    this.props.setRoute("/gallery/");
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
        <div className="home-gallery-menu">
          <Container>
            <Row>
              <Col md="7" lg="9">
                <div className="home-filters-containers">
                  {filters.length !== 0 ? (
                    filters.map(el => (
                      <span
                        key={el.metaID}
                        className="home-tags"
                      >
                        #{el.value} 
                        <FontAwesomeIcon 
                        icon={faTimesCircle} 
                        style={{cursor: 'pointer'}} 
                        onClick={() => this.props.removeSearch(el.metaID, el.value)}
                        />
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
        <div className="home-background parallax">
          <Container className="home-gallery-container">
            <Row>
              <Col>
                {loadingPhotos ? (
                  <LeitSpinner />
                ) : (
                  <Gallery
                    photos={mapped}
                    targetRowHeight={200}
                    onClick={(e, index) => this.handleOnClick(index)}
                    className="additional"
                  />
                )}
              </Col>
            </Row>
            <Row style={{ marginTop: "2em" }}>
              <Col>
                {loadingPhotos ? null : (
                  <HomePagination
                    pageLimit={pageLimit}
                    page={this.state.photoPagination.page}
                    setStatePage={this.setPage}
                    nbPhotos={this.props.photos.length}
                    maxAllowed={this.state.photoPagination.maxAllowed}
                  />
                )}
              </Col>
            </Row>
          </Container>
        </div>
      </Fragment>
    );
  }
}

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
