import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { user } from "../../../actions";
import { LeitSpinner } from "../../../components";
import { bindActionCreators } from "redux";
import UserAlbums from "./UserAlbums";
import {
  selectUserPublicStatus,
  selectUserPublicUser,
} from "../../../reducers";

const PublicAlbums = ({ match, dataStatus, publicUser, loadPublicUser }) => {
  useEffect(() => {
    // Load if necessary
    if (publicUser === undefined || publicUser.id !== Number(match.params.id)) {
      loadPublicUser(match.params.id);
    }
  }, [match.params.id, publicUser, loadPublicUser]);

  return dataStatus === "success" ? (
    <UserAlbums publicView publicUser={publicUser} />
  ) : (
    <Container style={{ textAlign: "center" }}>
      <Row>
        <Col>
          <LeitSpinner />
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  dataStatus: selectUserPublicStatus(state),
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
