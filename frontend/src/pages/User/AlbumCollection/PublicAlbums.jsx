import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { user } from "../../../actions";
import { LeitSpinner } from "../../../components";
import UserAlbums from "./UserAlbums";

const PublicAlbums = ({ match, publicLoading, publicUser, loadPublicUser }) => {
  useEffect(() => {
    // Load if necessary
    if (publicUser === undefined || publicUser.id !== Number(match.params.id)) {
      loadPublicUser(match.params.id);
    }
  }, [match.params.id, publicUser, loadPublicUser]);

  return publicLoading ? (
    <Container style={{ textAlign: "center" }}>
      <Row>
        <Col>
          <LeitSpinner />
        </Col>
      </Row>
    </Container>
  ) : (
    <UserAlbums isPublic publicUser={publicUser} />
  );
};

const mapStateToProps = state => ({
  publicLoading: state.user.publicLoading,
  publicUser: state.user.publicUser
});

const mapActionsToProps = dispatch => ({
  loadPublicUser: id => dispatch(user.loadAUser(id))
});

export default connect(mapStateToProps, mapActionsToProps)(PublicAlbums);
