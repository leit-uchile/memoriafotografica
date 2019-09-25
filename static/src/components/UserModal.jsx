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

const UserModal = ({ logout, user }) => {
  const [toggle, setToggle] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const doToggle = () => setToggle(!toggle);

  const doLogout = () => {
    logout();
    doToggle();
  };

  const { first_name, last_name, user_type } = user;

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
              {user_type > 2 ? (
                <Col>
                  <h4 style={styles.headers}>Interfaz de Administrador</h4>
                </Col>
              ) : null}
              {user_type > 1 ? (
                <Col>
                  <h4 style={styles.headers}>Interfaz de curador</h4>
                </Col>
              ) : null}

              <Col>
                <h4 style={styles.headers}>Gestionar perfil</h4>
              </Col>
            </Row>
            <Row style={{marginTop: "0.5em"}}>
              {user_type > 2 ? (
                <Col>
                  <Button
                    block
                    color="warning"
                    onClick={() => {
                      doToggle();
                      window.location.assign("http://localhost:8000/admin");
                      setTimeout(() => setRedirect(false), 1000);
                    }}>
                    Administrar Sitio
                  </Button>
                </Col>
              ) : null}
              {user_type > 1 ? (
                <Col>
                  <Button
                    block
                    color="primary"
                    onClick={() => {
                      doToggle();
                      setRedirect("/curador/dashboard/");
                      setTimeout(() => setRedirect(false), 1000);
                    }}>
                    Dashboard
                  </Button>
                </Col>
              ) : null}
              <Col>
                <Button
                  block
                  color="primary"
                  onClick={() => {
                    doToggle();
                    setRedirect("/user/dashboard/");
                    setTimeout(() => setRedirect(false), 1000);
                  }}>
                  Ir a Perfil
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
    user: state.user.userData
  };
};

const mapActionsToProps = dispatch => {
  return {
    logout: () => {
      return dispatch(auth.logout());
    }
  };
};

const styles = {
  headers: {
    fontSize: "1.2em",
    textAlign: "center",
  }
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(UserModal);
