import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { user } from "../../actions";
import { Container, Row, Col } from "reactstrap";

const EmailConfirmation = ({ location, getActivationCode, activateUser }) => {
  const [state, setState] = useState({
    status: 0, // State obtenido del backend
    userID: -1
  });

  useEffect(() => {
    let obj = getActivationCode(location.search)
    setState( {status: obj.state, userID: obj.user})
  }, [])

  const SuccefulConfirmation = (props) => (
    <Container style={{ textAlign: "center", marginTop: "2em" }}>
      <Row>
        <Col>
          <h2>¡Activacion exitosa!</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <p style={{ marginTop: "2em" }}>
            Haz activado tu cuenta. Ahora puedes hacer uso del repositorio
          </p>
        </Col>
      </Row>
    </Container>
  );

  const FailedConfirmation = (props) => (
    <Container style={{ textAlign: "center", marginTop: "2em" }}>
      <Row>
        <Col>
          <h2>No pudimos activar tu cuenta</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <p style={{ marginTop: "2em" }}>
            Si esto persiste por favor informanos a{" "}
            <a href="mailto:soporte@leit.cl?Subject=Error%20en%20el%20sitio">
              soporte&#64;leit.cl
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );

  if (state.status===1) {
    // Actualizar state = 0 para RegisterLink en backend
    //
    // Actualizar is_active = True para User en backend
    // activateUser({ id: state.userID, is_active: true });
    return <SuccefulConfirmation />;
  }
  return <FailedConfirmation />;
};

const mapStateToProps = (state) => ({});

const mapActionsToProps = (dispatch) => ({
  getActivationCode: (code) => dispatch(user.getRegisterLink(code)),
  activateUser: (userInfo, doJSON = true) => dispatch(user.editProfile(userInfo, doJSON)),
});

export default connect(mapStateToProps, mapActionsToProps)(EmailConfirmation);
