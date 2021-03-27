import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { user } from "../../actions";
import { selectUserNotificationUpdate } from "../../reducers";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faImage,
  faComment,
  faBell,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { bindActionCreators } from "redux";
import "./notification.css";

const makeIcons = (content_type) => {
  switch (content_type) {
    case 1:
      return <FontAwesomeIcon icon={faUser} />;
    case 2:
      return <FontAwesomeIcon icon={faImage} />;
    case 3:
      return <FontAwesomeIcon icon={faComment} />;
    default:
      return <FontAwesomeIcon icon={faBell} />;
  }
};

const typeToText = (t) => {
  switch (t) {
    case 1:
      return "Aprobación";
    case 2:
      return "Edición";
    case 3:
      return "Censura";
    default:
      return "Otro";
  }
};

const Notification = ({
  element: { id, type, content, message, created_at, read },
  markAsRead,
  updatedNotification,
}) => {
  const [isRead, setIsRead] = useState(read);

  useEffect(() => {
    updatedNotification.id === id
      ? setIsRead(updatedNotification.read)
      : console.log();
    // eslint-disable-next-line
  }, [updatedNotification]);

  return (
    <Container fluid className="notification-div">
      <Row>
        <Col xs={3} md={2} ld={1}>
          <div style={{ textAlign: "center", fontSize: "30px" }}>
            {makeIcons(content)}
          </div>
        </Col>
        <Col xs={8} md={9} ld={10}>
          <div className="notification-header">
            <b>{typeToText(type)}</b>
          </div>
          {created_at ? (
            <div className="notification-date"> {moment(created_at).fromNow()}</div>
          ) : (
            <div className="notification-date">Cargando...</div>
          )}
          <p style={{ display: "block" }}>{message}</p>
        </Col>
        <Col>
          {!isRead ? (
            <Button color="link" onClick={() => markAsRead(id)}>
              <FontAwesomeIcon icon={faCircle} title="Marcar como leído" />
            </Button>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  updatedNotification: selectUserNotificationUpdate(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      markAsRead: user.updateNotification,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(Notification);
