import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Row, Col, Container } from "reactstrap";
import { Helmet } from "react-helmet";

import { selectPhotos,
          selectPhotosDetails,
          selectSiteMiscHomeSelectedIndex} from "../../reducers";
import ReportModal from "../../components/ReportModal";
import CommentHandler from "./CommentHandler";
import Photo from "../../components/Photo";
import { site_misc, gallery, webadmin } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarPlus,
  faCamera,
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { getPermissionLogo } from "../../utils";
import Tags from "./Tags";
import Categories from "./Categories";
import Addthis from "./Addthis";
import "./styles.css";

class PhotoDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestionsLoaded: false,
      myPhotoID: this.props.match.params.id,
      firstLoad: true,
      redirectToGallery: false,
      // Page management
      currentIndex: -1,
      leftIndex: -1,
      rightIndex: -1,
      pageViewLimit: 10,
      leftPage: 0,
    };
    this.imageContainer = React.createRef();
  }

  getDataFromBack = () => {
    // Load elements once props arrive
    if (this.props.suggestions.length === 0) {
      this.props.loadSuggestions();
    }
  };

  redirectToSearch = (tagId, value) => {
    if (tagId !== undefined && tagId !== "") {
      this.props.putSearch(tagId, value);
      this.setState({ redirectToGallery: true });
    }
  };

  componentDidMount() {
    /* this.imageContainer.current.scrollIntoView({
      block: "start",
      behavior: "smooth"
    }); */

    // Load info the first time
    this.setState({ loadingPhoto: true }, () =>
      this.props.onLoad(this.state.myPhotoID)
    );
  }

  computeIndexes = () => {
    const { suggestions } = this.props;
    let index;
    suggestions.forEach((el, key) => {
      // eslint-disable-next-line
      if (el.id == Number(this.state.myPhotoID)) {
        index = key;
      }
    });

    console.log(suggestions, index, this.state.myPhotoID);
    var leftPage =
      this.state.pageViewLimit * Math.floor(index / this.state.pageViewLimit);
    let leftPhotoId = index > 0 ? suggestions[index - 1].id : suggestions[0].id;
    let rightPhotoId =
      index < suggestions.length - 1
        ? suggestions[index + 1].id
        : suggestions[index].id;

    this.props.setSelectedId(index);
    this.setState({
      currentIndex: index,
      leftIndex: leftPhotoId,
      rightIndex: rightPhotoId,
      leftPage: leftPage,
    });
  };

  componentDidUpdate(prevProps) {
    // Load info when new props arrive or it is the first load
    if (
      (this.state.firstLoad && this.props.photoInfo.id !== undefined) ||
      prevProps.photoInfo.id !== this.props.photoInfo.id
    ) {
      /* this.imageContainer.current.scrollIntoView({
        block: "start",
        behavior: "smooth"
      }); */

      this.setState({ firstLoad: false, redirectWithButton: false }, () =>
        this.getDataFromBack()
      );
    }

    // Reload component with new ID
    if (prevProps.match.params.id !== this.props.match.params.id) {
      /* this.imageContainer.current.scrollIntoView({
        block: "start",
        behavior: "smooth"
       });*/

      this.setState(
        {
          myPhotoID: this.props.match.params.id,
          loadingPhoto: true,
          redirectWithButton: false,
        },
        () => {
          // If page was refreshed we need to get our index
          this.computeIndexes();

          this.props.onLoad(this.state.myPhotoID);
        }
      );
    }
  }

  render() {
    if (this.state.redirectToGallery) {
      return <Redirect to="/gallery" />;
    }

    const { photoInfo, suggestions } = this.props;

    // Populate on first load with data
    if (
      this.state.myPhotoID &&
      suggestions.length !== 0 &&
      this.state.currentIndex === -1
    ) {
      this.computeIndexes();
    }

    /*
     Suggestions are loaded by the gallery with an 
     index of our photo on the current group.
     If no group is selected one by default will be loaded
     and the index is -1
    */

    var Suggestions = suggestions
      ? suggestions
          .slice(
            this.state.leftPage,
            this.state.leftPage + this.state.pageViewLimit
          )
          .map((im, k) =>
            im.id !== photoInfo.id ? (
              <Photo
                style={{ marginLeft: "2px", display: "inline-block" }}
                key={k}
                url={im.thumbnail}
                name={"Foto relacionada"}
                useLink
                redirectUrl={"/photo/" + im.id}
                height={"50px"}
                width={"50px"}
              />
            ) : (
              <Photo
                style={{
                  marginLeft: "2px",
                  display: "inline-block",
                  backgroundBlendMode: "lighten",
                  backgroundColor: "var(--leit-pink)",
                }}
                key={k}
                url={im.thumbnail}
                name={"Foto relacionada"}
                height={"50px"}
                width={"50px"}
                onClick={() => {}}
              />
            )
          )
      : null;

    return (
      <div ref={this.imageContainer} className="disable-css-transitions">
        <Helmet>
          <meta
            property="og:url"
            content="http://memoriafotografica.ing.fcfm.cl/"
          />
          <meta property="og:title" content={photoInfo.title} />
          <meta property="og:type" content="website" />
          <meta property="og:description" content={photoInfo.description} />
          <meta property="og:image" content={photoInfo.thumbnail} />
          <title>{photoInfo.title}</title>
        </Helmet>
        <Container fluid>
          <Row style={styles.imageContainer}>
            <Col md={{ offset: 3, size: 6 }}>
              <h2 style={styles.center}>{photoInfo.title}</h2>
              <div style={{ textAlign: "center" }}>
                <Link
                  className="photoDetailNavigation"
                  to={`/photo/${this.state.leftIndex}`}
                >
                  <FontAwesomeIcon icon={faChevronCircleLeft} />
                </Link>
                <img
                  alt={photoInfo.title}
                  src={photoInfo.thumbnail}
                  style={{
                    display: "inline-block",
                    margin: "0 auto",
                    maxHeight: "60vh",
                    maxWidth: "75%",
                  }}
                />
                <Link
                  className="photoDetailNavigation"
                  to={`/photo/${this.state.rightIndex}`}
                >
                  <FontAwesomeIcon icon={faChevronCircleRight} />
                </Link>
              </div>
            </Col>
          </Row>
          <Row
            style={{
              ...styles.imageContainer,
              padding: "1em",
              minHeight: "auto",
              marginBottom: "2em",
            }}
          >
            <Col>
              <div style={{ textAlign: "center" }}>{Suggestions}</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Container>
                <Row>
                  <Col md={3}>
                    {photoInfo.user ? (
                      <Fragment>
                        <div
                          style={{
                            ...styles.avatarStyle.avatarImg,
                            backgroundImage: `url(${photoInfo.user.avatar})`,
                          }}
                        ></div>
                        <div style={{ marginLeft: "6em" }}>
                          <b>
                            <Link
                              to={"/user/public/" + photoInfo.user.id + "/"}
                            >{`${photoInfo.user.first_name} ${photoInfo.user.last_name}`}</Link>
                          </b>
                          <p>{photoInfo.user.rol_type}</p>
                        </div>
                      </Fragment>
                    ) : null}
                    <Tags
                      tags={photoInfo.metadata}
                      onRedirect={this.redirectToSearch}
                      style={{ clear: "both" }}
                    />
                    <Categories
                      cats={photoInfo.category}
                      onRedirect={this.redirectToSearch}
                    />
                  </Col>
                  <Col md={9}>
                    <Container fluid>
                      <Row>
                        <Col>
                          <h3>Descripción</h3>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <h5 style={{ color: "#999" }}>
                            <FontAwesomeIcon
                              icon={faCamera}
                              style={{ marginRight: "1em" }}
                            />
                            Tomada el{" "}
                            {moment(photoInfo.upload_date).format("DD/MM/YYYY")}
                          </h5>
                        </Col>

                        <Col>
                          <h5 style={{ color: "#999" }}>
                            <FontAwesomeIcon
                              icon={faCalendarPlus}
                              style={{ marginRight: "1em" }}
                            />
                            Subida el{" "}
                            {moment(photoInfo.created_at).format("DD/MM/YYYY")}
                          </h5>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>{photoInfo.description}</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Button
                            tag={Link}
                            to="/request-photo"
                            style={{
                              display: "inline-block",
                              height: "30px",
                              margin: "auto 2px auto 2px",
                            }}
                            className="float-left"
                            onClick={() => {
                              this.props.putRequestPhoto(photoInfo);
                            }}
                          >
                            Solicitar foto
                          </Button>
                          <ReportModal
                            style={{
                              display: "inline-block",
                              width: "30px",
                              height: "30px",
                              margin: "auto 2px auto 2px",
                            }}
                            className="float-left"
                            elementId={this.props.match.params.id}
                            reportTitle={"Reportar fotografia"}
                            options={[
                              "Contenido inapropiado",
                              "Incita a la violencia",
                              "Usuario no es autor del contenido",
                            ]}
                            helpText={
                              "Si consideras que hay un problema con esta fotografía por favor envíamos un reporte mediante este formulario."
                            }
                            reportType={2}
                          />
                          <Addthis
                            title={photoInfo.title}
                            description={photoInfo.description}
                            thumbnail={photoInfo.thumbnail}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row
            style={{
              borderTop: "solid 1px gray",
              marginTop: "2em",
              paddingTop: "2em",
            }}
          >
            <Col>
              <Container>
                <Row>
                  <Col md={3}>
                    <h3>Licencia</h3>
                    {photoInfo.permission.map((el) =>
                      getPermissionLogo(el, 90, 32)
                    )}
                  </Col>
                  <Col md={9}>
                    <CommentHandler id={this.props.match.params.id} fluid />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const styles = {
  imageContainer: {
    backgroundColor: "#212124",
    color: "white",
    padding: "3em 0",
    position: "relative",
    minHeight: "40vh",
  },
  center: {
    textAlign: "center",
  },
  avatarStyle: {
    avatarImg: {
      width: "50px",
      height: "50px",
      borderRadius: "25px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      float: "left",
    },
    avatarText: {},
  },
  cc: {
    position: "absolute",
    bottom: "0",
  },
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  photoInfo: selectPhotosDetails(state),
  suggestions: selectPhotos(state),
  photoIndex: selectSiteMiscHomeSelectedIndex(state),
});

const mapActionsToProps = (dispatch) => ({
  onLoad: (id) => dispatch(gallery.photos.getPhoto(id)),
  loadSuggestions: () => dispatch(gallery.photos.home()),
  putSearch: (id, value) => dispatch(site_misc.putSearchItem(id, value)),
  putRequestPhoto: (value) => dispatch(webadmin.putRequestPhoto(value)),
  setSelectedId: (id) => dispatch(site_misc.setSelectedId(id)),
});

export default connect(mapStateToProps, mapActionsToProps)(PhotoDetails);
