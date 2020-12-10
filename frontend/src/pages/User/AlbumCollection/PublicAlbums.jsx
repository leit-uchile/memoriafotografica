import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { user } from "../../../actions";
import { LeitSpinner } from "../../../components";
import { bindActionCreators } from "redux";
import UserAlbums from "./UserAlbums";
import { selectUserPublicLoading,
         selectUserPublicUser } from "../../../reducers";

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
    <UserAlbums publicView publicUser={publicUser} />
  );
};

const mapStateToProps = (state) => ({
  publicLoading: selectUserPublicLoading(state),
  publicUser: selectUserPublicUser(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      loadPublicUser: user.loadAUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(PublicAlbums);
