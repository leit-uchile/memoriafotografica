import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { site_misc } from "../../actions";
import { Container, Row, Col, Badge, Button } from "reactstrap";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
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
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoPagination: {
        page: 0,
        maxAllowed: 25, // MASTER CONFIG
      },
      maxAllowedCategories: 4,
      sortOpen: false,
      chosenPhotoIndex: 0, // For redirect
      redirect: false,
      link: "",
      catIds: [],
      sorting: "",
    };

    // componentWillLoad
    this.props.setRoute("/gallery");
  }

  putFilterInfo = (o) => {
    this.setState({ catIds: o.cats, sorting: o.sorting });
  };

  handleOnClick = (obj) => {
    this.setState({ redirect: true, chosenPhotoIndex: obj.index });
  };

  resetHomePagination = () => {
    this.setState({
      photoPagination: {
        maxAllowed: this.state.photoPagination.maxAllowed,
        page: 0,
      },
    });
  };

  /**
   * Method for HomePagination
   */
  setPage = (number) => {
    this.setState({
      photoPagination: {
        maxAllowed: this.state.photoPagination.maxAllowed,
        page: number,
      },
    });
  };

  render() {
    const { photos, filters, loadingPhotos, count } = this.props;
    const { maxAllowed } = this.state.photoPagination;

    // For gallery
    var mapped = photos.map((el) => ({
      src: el.thumbnail,
      height: el.aspect_h,
      width: el.aspect_w,
      id: el.id,
    }));

    if (this.state.redirect) {
      this.props.setRoute("/photo"); // For NavLink in Navbar
      this.props.setSelectedId(this.state.chosenPhotoIndex); // For in photo navigation
      this.props.setPhotoPagination(this.state.photoPagination);

      var url = "?";
      url = url + "sort=" + this.state.sorting;
      url =
        this.state.catIds.length === 0
          ? url
          : url + "&category=" + this.state.catIds.join(",");
      url =
        this.props.filters.length === 0
          ? url
          : url +
            "&metadata=" +
            this.props.filters.map((el) => el.metaID).join(",");
      this.setState({ redirect: false });
      return (
        <Redirect
          push
          to={`/photo/${mapped[this.state.chosenPhotoIndex].id}/${url}`}
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
                    onClick={(e, index) => this.handleOnClick(index)}
                    className="additional"
                  />
                )}
              </Col>
            </Row>
            <Row style={{ marginTop: "2em" }}>
              <Col>
                {loadingPhotos ? null : (
                  <Pagination
                    count={count}
                    page_size={maxAllowed}
                    page={this.state.photoPagination.page}
                    setStatePage={this.setPage}
                    size="lg"
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
