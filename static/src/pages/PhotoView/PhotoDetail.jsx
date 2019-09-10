import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Row, Col, Container, Badge } from "reactstrap";
import { Helmet } from "react-helmet";

import ReportModal from "./ReportModal";
import CommentHandler from "./CommentHandler";
import Photo from "../../components/Photo";
import { photoDetails, home } from "../../actions";
import moment from "moment";

const getPermissionLogo = (name, w, h, offset) => {
  switch (name) {
    case "CC BY":
      return (
        <img
          width={w}
          height={h}
          src="/assets/CCBY.svg"
          style={{ ...styles.cc, right: `${offset * w}px` }}
        />
      );
    case "CC BY-NC":
      return (
        <img
          width={w}
          height={h}
          src="/assets/CCBYNC.svg"
          style={{ ...styles.cc, right: `${offset * w}px` }}
        />
      );
    case "CC BY-NC-ND":
      return (
        <img
          width={w}
          height={h}
          src="/assets/CCBYNCND.svg"
          style={{ ...styles.cc, right: `${offset * w}px` }}
        />
      );
    case "CC BY-NC-SA":
      return (
        <img
          width={w}
          height={h}
          src="/assets/CCBYNCSA.svg"
          style={{ ...styles.cc, right: `${offset * w}px` }}
        />
      );
    case "CC BY-ND":
      return (
        <img
          width={w}
          height={h}
          src="/assets/CCBYND.svg"
          style={{ ...styles.cc, right: `${offset * w}px` }}
        />
      );
    case "CC BY-SA":
      return (
        <img
          width={w}
          height={h}
          src="/assets/CCBYSA.svg"
          style={{ ...styles.cc, right: `${offset * w}px` }}
        />
      );
    default:
      return null;
  }
};

const Tags = ({ tags }) => (
  <Container fluid>
    <Row>
      <Col sm={{ offset: 2, size: 10 }} style={{ fontSize: "1.2em" }}>
        {tags.length == 0 ? (
          <p>No hay tags asociados</p>
        ) : (
          tags.map((el, index) => (
            <Badge key={el.id} color="secondary" pill>
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
      firstLoad: true
    };
    this.getDataFromBack = this.getDataFromBack.bind(this);
    this.getMetadataNames = this.getMetadataNames.bind(this);
  }

  getUserDetails() {
    this.setState({
      userinfo: {
        id: 1,
        name: "Juan",
        avatar:
          "https://lithespeed.com/wp-content/uploads/2019/04/listermann-profile-picture-e1556572036426.jpg"
      }
    });
  }

  getMetadataNames() {
    this.props.loadMetadata(this.props.photoInfo.details.metadata);
  }

  getDataFromBack() {
    // Load elements once props arrive
    this.getUserDetails();
    this.getMetadataNames();
    this.props.loadSuggestions();
  }

  componentWillMount() {
    this.imageContainer = React.createRef();
  }

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
    const { photoInfo, suggestions, metadata } = this.props;

    var Suggestions =
      suggestions && photoInfo
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
              ) : null
            )
        : null;

    var userProfile = this.state.userinfo ? (
      <Container fluid>
        <Row>
          <Col sm={2}>
            <div
              style={{
                ...styles.avatarStyle.avatarImg,
                backgroundImage: `url(${this.state.userinfo.avatar})`
              }}></div>
          </Col>
          <Col sm={10}>
            <b>{this.state.userinfo.name}</b>
            <p>Generacion 2013</p>
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
            {photoInfo.details.permission.map((el, i) =>
              getPermissionLogo(el, 90, 32, i)
            )}
          </Row>
          <Row>
            <Col>
              <Container>
                <Row>
                  <Col md={5}>
                    {userProfile}
                    <Tags tags={metadata} />
                  </Col>
                  <Col md={7}>
                    <h3>Descripcion</h3>
                    <h5 style={{ color: "#999" }}>
                      Subida el{" "}
                      {moment(photoInfo.details.upload_date).format(
                        "DD/MM/YYYY"
                      )}
                    </h5>
                    <p>
                      {photoInfo.details.description}
                    </p>
                    <Button tag={Link} to="/" className="float-left">
                      ¿Quieres usar la foto?
                    </Button>
                    <ReportModal
                      style={{ display: "inline-block" }}
                      className="float-left"
                    />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row style={{borderTop: "solid 1px gray", marginTop: "2em"}}>
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

const mapStateToProps = state => {
  return {
    auth: state.auth,
    photoInfo: state.photoDetails,
    suggestions: state.home.photos,
    metadata: state.photoDetails.metadataNames
  };
};

const mapActionsToProps = dispatch => {
  return {
    onLoad: id => {
      return dispatch(photoDetails.getPhoto(id));
    },
    fetchComments: (id, auth) => {
      return dispatch(photoDetails.getComments(id, auth));
    },
    loadSuggestions: () => {
      return dispatch(home.home());
    },
    newComment: (id, comment, auth) => {
      return dispatch(photoDetails.putComment(id, comment, auth));
    },
    loadMetadata: ids => {
      return dispatch(photoDetails.getMetadataNames(ids));
    }
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(PhotoDetails);
