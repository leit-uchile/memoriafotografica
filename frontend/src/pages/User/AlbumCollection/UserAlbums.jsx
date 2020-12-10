import React, { useState, useEffect } from "react";
import { Container, Row, Col, Badge } from "reactstrap";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { user } from "../../../actions";
import uuid4 from "uuid";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import "../styles.css";
import { selectUserData, selectUserAlbums } from "../../../reducers";
import AlbumGallery from "../../../components/AlbumGallery";

const UserAlbums = ({
  isPublic,
  user,
  albums,
  publicUser,
  loadPublicAlbums,
  loadAlbums,
}) => {
  const [display, setDisplay] = useState({
    user: { first_name: "usuario" },
    redirectUrl: false,
  });

  // Set user info and load the albums accordingly
  useEffect(() => {
    if (isPublic && publicUser !== undefined) {
      setDisplay((d) => ({ ...d, user: publicUser }));
      loadPublicAlbums(publicUser.id);
    } else if (!isPublic) {
      loadAlbums(user.id, -1, -1);
      setDisplay((d) => ({ ...d, user: user }));
    }
  }, [isPublic, publicUser, loadPublicAlbums, loadAlbums, user]);

  const setRedirect = (id) => {
    setDisplay({
      ...display,
      redirectUrl: isPublic
        ? `/user/public/albums/${id}`
        : `/user/dashboard/albums/${id}`,
    });
  };

  return display.redirectUrl ? (
    <Redirect push to={display.redirectUrl} />
  ) : (
    <Container fluid className="dashboard">
      <Helmet>
        <title>
          {isPublic && publicUser
            ? "Albums de " + display.user.first_name
            : "Mis albumes"}
        </title>
      </Helmet>
      <Row>
        <Col className="dashboard-col">
          <h2
            style={{
              textAlign: `${isPublic ? "center" : "left"}`,
            }}
          >
            {isPublic ? `Albums de ${display.user.first_name}` : "Mis albumes"}{" "}
            <Badge color="primary">{albums.length}</Badge>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col className="dashboard-col">
          <Container fluid>
            <Row>
              <Col>
                <AlbumGallery
                  albums={albums}
                  onClick={(e, obj) => {
                    setRedirect(albums[obj.index].id);
                  }}
                />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: selectUserData(state),
  albums: selectUserAlbums(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      loadPublicAlbums: user.loadPublicUserAlbums,
      loadAlbums: user.getUserAlbums,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(UserAlbums);
