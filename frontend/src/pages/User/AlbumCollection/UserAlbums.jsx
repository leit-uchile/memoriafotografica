import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { user } from "../../../actions";
import uuid4 from "uuid";
import { Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import "../styles.css";

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

  const [rows, setRows] = useState([]);

  useEffect(() => {
    let list = [];
    for (let index = 0; index < albums.length; index = index + 3) {
      let cols = [];
      if (albums[index]) cols.push(albums[index]);
      if (albums[index + 1]) cols.push(albums[index + 1]);
      if (albums[index + 2]) cols.push(albums[index + 2]);
      cols.theKey = uuid4();
      list.push(cols);
    }
    setRows(list);
  }, [albums]);

  const setRedirect = (id) => {
    setDisplay({
      ...display,
      redirectUrl: isPublic
        ? `/user/public/albums/${id}`
        : `/user/albums/${id}`,
    });
  };

  return display.redirectUrl ? (
    <Redirect push to={display.redirectUrl} />
  ) : (
    <Container fluid className="dashboard">
      <Helmet>
        <title>
          {isPublic && publicUser
            ? "Albums de" + display.user.first_name
            : "Mis albumes"}
        </title>
      </Helmet>
      <Row>
        <Col>
          <h2
            style={{
              textAlign: `${isPublic ? "center" : "left"}`,
            }}
          >
            {isPublic ? `Albums de ${display.user.first_name}` : "Mis albumes"}
          </h2>
          {/* <Badge color="primary">{mapped.length}</Badge> */}
        </Col>
      </Row>
      <Row>
        <Col>
          <Container fluid>
            {rows.map((r) => (
              <Row key={r.key} style={{ marginTop: "1em" }}>
                {r.map((c) => (
                  <Col key={c.name}>
                    <div
                      style={{
                        backgroundImage: `url("${c.thumbnail}")`,
                        cursor: "pointer",
                      }}
                      className="user-albums-background"
                      onClick={() => {
                        setRedirect(c.id);
                      }}
                    >
                      <h4>{c.name}</h4>
                    </div>
                  </Col>
                ))}
              </Row>
            ))}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.userData,
  albums: state.user.albums,
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
