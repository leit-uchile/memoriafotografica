import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  NavLink,
  Container,
  Row,
  Col,
  ModalFooter,
  Badge,
} from "reactstrap";
import { connect } from "react-redux";
import { site_misc, user } from "../actions";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./userModal.css";
import { selectUserData, selectUserNotifications } from "../reducers";
import PropTypes from "prop-types";

const UserModal = ({ logout, user, getNotifications, nNotif }) => {
  const [toggle, setToggle] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const doToggle = () => {
    setToggle(!toggle);
    !toggle ? getNotifications(user.id, 1, 1, "&read=false") : void 0;
  };

  const doLogout = () => {
    logout();
    doToggle();
  };

  const { first_name, last_name, user_type } = user;

  return (
    <NavLink href="#" onClick={doToggle}>
      <FontAwesomeIcon icon={faUser} />{" "}
      {`${first_name ? first_name : "Nombre"} ${
        last_name ? last_name : "Apellido"
      }`}
      {redirect ? <Redirect push to={redirect} /> : null}
      <Modal isOpen={toggle} toggle={doToggle}>
        <ModalHeader toggle={doToggle}>
          {`${first_name ? first_name : "Nombre"} ${
            last_name ? last_name : "Apellido"
          }`}
        </ModalHeader>
        <ModalBody>
          <Container fluid>
            <Row className="user-modal-interfaces">
              {user_type > 2 ? (
                <Col>
                  <h4>Interfaz de administrador</h4>
                </Col>
              ) : null}
              {user_type > 1 ? (
                <Col>
                  <h4>Interfaz de curador</h4>
                </Col>
              ) : null}

              <Col>
                <h4>
                  Perfil y notificaciones{" "}
                  <Badge pill color="primary">
                    {nNotif ? nNotif.count : "-"}
                  </Badge>
                </h4>
              </Col>
            </Row>
            <Row style={{ marginTop: "0.5em" }}>
              {user_type > 2 ? (
                <Col>
                  <Button
                    block
                    color="primary"
                    onClick={() => {
                      doToggle();
                      window.location.assign("http://localhost:8000/admin");
                      setTimeout(() => setRedirect(false), 1000);
                    }}
                  >
                    Administrar Sitio
                  </Button>
                </Col>
              ) : null}
              {user_type > 1 ? (
                <Col>
                  <Button
                    block
                    color="secondary"
                    onClick={() => {
                      doToggle();
                      setRedirect("/curador/dashboard/");
                      setTimeout(() => setRedirect(false), 1000);
                    }}
                  >
                    Dashboard
                  </Button>
                </Col>
              ) : null}
              <Col
                sm={user_type === 1 ? { size: "4", offset: "4" } : undefined}
              >
                <Button
                  block
                  color="primary"
                  onClick={() => {
                    doToggle();
                    setRedirect("/user/dashboard/");
                    setTimeout(() => setRedirect(false), 1000);
                  }}
                >
                  Ir al Escritorio
                </Button>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="tertiary" onClick={doLogout}>
            Cerrar sesi&oacute;n
          </Button>
        </ModalFooter>
      </Modal>
    </NavLink>
  );
};

UserModal.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: selectUserData(state),
  nNotif: selectUserNotifications(state),
});

const mapActionsToProps = (dispatch) => ({
  logout: () => dispatch(user.logout()),
  setLoginSuccessRoute: (route) => dispatch(site_misc.addLoginRoute(route)),
  getNotifications: (userId, page, page_size, extra) =>
    dispatch(user.getUserNotifications(userId, page, page_size, extra)),
});

export default connect(mapStateToProps, mapActionsToProps)(UserModal);
