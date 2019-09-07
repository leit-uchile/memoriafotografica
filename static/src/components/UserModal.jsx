import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  NavLink
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
      {redirect ? <Redirect to="/user/dashboard" /> : null}
      <Modal isOpen={toggle} toggle={doToggle}>
        <ModalHeader toggle={doToggle}>
          {`${first_name ? first_name : "Nombre"} ${
            last_name ? last_name : "Apellido"
          }`}
        </ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
              doToggle();
              setRedirect(true);
              setTimeout(() => setRedirect(false), 1000);
            }}>
            Ir a Perfil
          </Button>
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
