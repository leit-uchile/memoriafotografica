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
import { LeitSpinner } from "../../../components";

const UserAlbums = ({
  publicView,
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
    if (publicView && publicUser !== undefined) {
      setDisplay((d) => ({ ...d, user: publicUser }));
      loadPublicAlbums(publicUser.id, "&page=1&page_size=100");
    } else if (!publicView) {
      loadAlbums(user.id, 1, 100);
      setDisplay((d) => ({ ...d, user: user }));
    }
  }, [publicView, publicUser, loadPublicAlbums, loadAlbums, user]);

  const setRedirect = (id) => {
    setDisplay({
      ...display,
      redirectUrl: publicView
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
          {publicView && publicUser
            ? "Albums de " + display.user.first_name
            : "Mis albumes"}
        </title>
      </Helmet>
      <Row>
        <Col className="dashboard-col">
          <h2
            style={{
              textAlign: `${publicView ? "center" : "left"}`,
            }}
          >
            {publicView
              ? `Albums de ${display.user.first_name}`
              : "Mis albumes"}{" "}
            {albums.results ? (
              <Badge color="primary">{albums.results.length}</Badge>
            ) : null}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col className="dashboard-col">
          <Container fluid>
            <div className="stat-box rounded">
              {albums.results ? (
                <Row>
                  <Col
                    sm={
                      albums.results.length === 1
                        ? { size: 4, offset: 4 }
                        : { size: 12 }
                    }
                  >
                    <AlbumGallery
                      albums={albums.results}
                      onClick={(e, obj) => {
                        setRedirect(albums.results[obj.index].id);
                      }}
                    />
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col style={{ textAlign: "center" }}>
                    <LeitSpinner />
                  </Col>
                </Row>
              )}
            </div>
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
