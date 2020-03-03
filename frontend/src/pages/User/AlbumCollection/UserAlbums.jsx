import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { user } from "../../../actions";
import uuid4 from "uuid";
import "./albumcollection.css";
import { Redirect } from "react-router";

const UserAlbums = ({
  isPublic,
  user,
  albums,
  publicUser,
  loadPublicAlbums,
  loadAlbums
}) => {
  const [display, setDisplay] = useState({
    user: { first_name: "usuario" },
    redirectUrl: false
  });

  // Set user info and load the albums accordingly
  useEffect(() => {
    if (isPublic && publicUser !== undefined) {
      setDisplay(d => ({ ...d, user: publicUser }));
      loadPublicAlbums(publicUser.id);
    } else if (!isPublic) {
      loadAlbums(user.id);
      setDisplay(d => ({ ...d, user: user }));
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

  const setRedirect = id => {
    setDisplay({
      ...display,
      redirectUrl: isPublic ? `/user/public/albums/${id}` : `/user/albums/${id}`
    });
  };

  return display.redirectUrl ? (
    <Redirect push to={display.redirectUrl} />
  ) : (
    <Container fluid>
      <Helmet>
        <title>Albums de {display.user.first_name}</title>
      </Helmet>
      <Row className="album-title-row">
        <Col>
          <h2>Albums de {display.user.first_name}</h2>
          <h5>Total: {albums.length}</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            {rows.map(r => (
              <Row key={r.key}>
                {r.map(c => (
                  <Col key={c.name}>
                    <div
                      style={{ backgroundImage: `url("${c.thumbnail}")`, cursor: "pointer" }}
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

const mapStateToProps = state => ({
  user: state.user.userData,
  albums: state.user.albums
});

const mapActionsToProps = dispatch => ({
  loadPublicAlbums: user_id => dispatch(user.loadPublicUserAlbums(user_id)),
  loadAlbums: user_id => dispatch(user.getUserAlbums(user_id, -1, -1))
});

export default connect(mapStateToProps, mapActionsToProps)(UserAlbums);
