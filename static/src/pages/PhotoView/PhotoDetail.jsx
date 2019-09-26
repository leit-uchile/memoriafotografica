import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Row, Col, Container, Badge } from "reactstrap";
import { Helmet } from "react-helmet";

import ReportModal from "./ReportModal";
import CommentHandler from "./CommentHandler";
import Photo from "../../components/Photo";
import { photoDetails, home, search, requestPhoto } from "../../actions";
import moment from "moment";

const getPermissionLogo = (name, w, h, offset) => {
  var url;
  switch (name) {
    case "CC BY":
      url = "/assets/CCBY.svg";
      break;
    case "CC BY-NC":
      url = "/assets/CCBYNC.svg";
      break;
    case "CC BY-NC-ND":
      url = "/assets/CCBYNCND.svg";
      break;
    case "CC BY-NC-SA":
      url = "/assets/CCBYNCSA.svg";
      break;
    case "CC BY-ND":
      url = "/assets/CCBYND.svg";
      break;
    case "CC BY-SA":
      url = "/assets/CCBYSA.svg";
      break;
    default:
      url = "/assets/CCBYSA.svg";
  }
  // style={{ ...styles.cc, right: `${offset * w}px` }}
  return <img width={w} height={h} src={url} />;
};

const Tags = ({ tags, onRedirect }) => (
  <Container fluid>
    <Row>
      <Col sm={{ offset: 2, size: 10 }} style={{ fontSize: "1.2em" }}>
        {tags.length == 0 ? (
          <p>No hay tags asociados</p>
        ) : (
          tags.map((el, index) => (
            <Badge
              key={el.id}
              color="secondary"
              pill
              onClick={e => onRedirect(el.id, el.value)}>
              #{el.value}
            </Badge>
          ))
        )}
      </Col>
    </Row>
  </Container>
);

class PhotoDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestionsLoaded: false,
      auth: this.props.auth,
      myPhotoID: this.props.match.params.id,
      firstLoad: true,
      redirectToGallery: false
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
    this.imageContainer.current.scrollIntoView({
      block: "start",
      behavior: "smooth"
    });
    // Load info the first time
    this.setState({ loadingPhoto: true }, () =>
      this.props.onLoad(this.state.myPhotoID)
    );
  }

  componentDidUpdate(prevProps) {
    // Load info when new props arrive or it is the first load
    if (
      (this.state.firstLoad && this.props.photoInfo.details.id !== undefined) ||
      prevProps.photoInfo.details.id !== this.props.photoInfo.details.id
    ) {
      this.imageContainer.current.scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
      this.setState(
        {
          firstLoad: false
        },
        function() {
          this.getDataFromBack();
        }
      );
    }

    // Reload component with new ID
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.imageContainer.current.scrollIntoView({
        block: "start",
        behavior: "smooth"
      });
      this.setState(
        {
          myPhotoID: this.props.match.params.id,
          loadingPhoto: true
        },
        () => {
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

    /*
     Suggestions are loaded by the gallery with an 
     index of our photo on the current group.
     If no group is selected one by default will be loaded
     and the index is -1
    */
    // TODO: when clicking navigate updating the selectedIndex
    var Suggestions = suggestions
      ? suggestions
          .slice(0, 10)
          .map((im, k) =>
            im.id !== photoInfo.details.id ? (
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
                  backgroundColor: "#ff5a60"
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

    var userProfile = photoInfo.details.user ? (
      <Container fluid>
        <Row>
          <Col sm={2}>
            <div
              style={{
                ...styles.avatarStyle.avatarImg,
                backgroundImage: `url(${photoInfo.details.user.avatar})`
              }}></div>
          </Col>
          <Col sm={10}>
            <b>{`${photoInfo.details.user.first_name} ${photoInfo.details.user.last_name}`}</b>
            <p>{photoInfo.details.user.rol_type}</p>
          </Col>
        </Row>
      </Container>
    ) : null;

    return (
      <div ref={this.imageContainer}>
        <Helmet>
          <meta property="og:title" content={photoInfo.details.title} />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content=" http://memoriafotografica.ing.fcfm.cl/"
          />
          <meta property="og:image" content=" http://example.com/image.jpg" />
          <meta property="og:description" content="Descripcion" />
          <title>{photoInfo.details.title}</title>
        </Helmet>
        <Container fluid>
          <Row style={styles.imageContainer}>
            <Col md={{ offset: 3, size: 6 }}>
              <h2 style={styles.center}>{photoInfo.details.title}</h2>
              <img
                alt={photoInfo.details.title}
                src={photoInfo.details.thumbnail}
                style={{
                  display: "block",
                  margin: "0 auto 0 auto",
                  maxHeight: "60vh",
                  maxWidth: "100%"
                }}
              />
            </Col>
          </Row>
          <Row
            style={{
              ...styles.imageContainer,
              padding: "1em",
              minHeight: "auto",
              marginBottom: "2em"
            }}>
            <Col>
              <div style={{ textAlign: "center" }}>{Suggestions}</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Container>
                <Row>
                  <Col md={5}>
                    {userProfile}
                    <Tags
                      tags={photoInfo.details.metadata}
                      onRedirect={this.redirectToSearch}
                    />
                  </Col>
                  <Col md={6}>
                    <h3>Descripcion</h3>
                    <h5 style={{ color: "#999" }}>
                      Subida el{" "}
                      {moment(photoInfo.details.upload_date).format(
                        "DD/MM/YYYY"
                      )}
                    </h5>
                    <p>{photoInfo.details.description}</p>
                    <Button
                      tag={Link}
                      to="/request-photo"
                      className="float-left"
                      onClick={() => {
                        this.props.putRequestPhoto(photoInfo.details);
                      }}>
                      ¿Quieres usar la foto?
                    </Button>
                    <ReportModal
                      style={{ display: "inline-block" }}
                      className="float-left"
                      photoId={this.props.match.params.id}
                    />
                  </Col>
                  <Col md={1}>
                    <h3>Licencias</h3>
                    {photoInfo.details.permission.map((el, i) =>
                      getPermissionLogo(el, 90, 32, i)
                    )}
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row style={{ borderTop: "solid 1px gray", marginTop: "2em" }}>
            <Col>
              <CommentHandler id={this.props.match.params.id} />
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
    padding: "3em",
    position: "relative",
    minHeight: "40vh"
  },
  center: {
    textAlign: "center"
  },
  avatarStyle: {
    avatarImg: {
      width: "50px",
      height: "50px",
      borderRadius: "25px",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    },
    avatarText: {}
  },
  cc: {
    position: "absolute",
    bottom: "0"
  }
};

const mapStateToProps = state => ({
  auth: state.auth,
  photoInfo: state.photoDetails,
  suggestions: state.home.photos,
  photoIndex: state.home.selectedIndex
});

const mapActionsToProps = dispatch => ({
  onLoad: id => dispatch(photoDetails.getPhoto(id)),
  fetchComments: (id, auth) => dispatch(photoDetails.getComments(id, auth)),
  loadSuggestions: () => dispatch(home.home()),
  newComment: (id, comment, auth) =>
    dispatch(photoDetails.putComment(id, comment, auth)),
  loadMetadata: ids => dispatch(photoDetails.getMetadataNames(ids)),
  putSearch: (id, value) => dispatch(search.putSearchItem(id, value)),
  putRequestPhoto: value => dispatch(requestPhoto.putRequestPhoto(value)),
  setSelectedId: id => dispatch(home.setSelectedId(id))
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PhotoDetails);
