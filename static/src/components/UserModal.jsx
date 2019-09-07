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
  ModalFooter
} from "reactstrap";
import { connect } from "react-redux";
import { auth } from "../actions";
import { Redirect } from "react-router-dom";

const UserModal = ({ logout, auth }) => {
  const [toggle, setToggle] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const doToggle = () => setToggle(!toggle);

  const doLogout = () => {
    logout(auth.token);
    doToggle();
  };

  const { first_name, last_name } = auth.user;

  return (
    <NavLink href="#" onClick={doToggle}>
      {`${first_name ? first_name : "Nombre"} ${
        last_name ? last_name : "Apellido"
      }`}
      {redirect ? <Redirect to={redirect} /> : null}
      <Modal isOpen={toggle} toggle={doToggle}>
        <ModalHeader toggle={doToggle}>
          {`${first_name ? first_name : "Nombre"} ${
            last_name ? last_name : "Apellido"
          }`}
        </ModalHeader>
        <ModalBody>
          <Container fluid>
            <Row>
              <Col>
              <h4>Mis fotos</h4>
              <Button
                color="primary"
                onClick={() => {
                  doToggle();
                  setRedirect("/user/dashboard/");
                  setTimeout(() => setRedirect(false), 1000);
                }}>
                Ir a Perfil
              </Button>
              </Col>
              <Col>
                <h4>Interfaz de curador</h4>
                <Button
                  color="primary"
                  onClick={() => {
                    doToggle();
                    setRedirect("/curador/dashboard/");
                    setTimeout(() => setRedirect(false), 1000);
                  }}>
                  Dashboard
                </Button>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="warning" onClick={doLogout}>
            Cerrar sesi&oacute;n
          </Button>
        </ModalFooter>
      </Modal>
    </NavLink>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapActionsToProps = dispatch => {
  return {
    logout: token => {
      return dispatch(auth.logout(token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UserModal);
