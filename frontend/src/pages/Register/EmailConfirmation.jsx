import React, { useEffect } from "react";
import { connect } from "react-redux";
import { user } from "../../actions";
import { Container, Row, Col } from "reactstrap";
import { bindActionCreators } from "redux";

const EmailConfirmation = ({ location, activateCode, status }) => {
  useEffect(() => {
    let code = location.search;
    code = code.slice(code.indexOf("code=") + 5);
    activateCode(code);
  }, [activateCode, location.search]);

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
            El código ya fue usado o ha expirado. Si esto persiste por favor
            informanos a{" "}
            <a href="mailto:soporte@leit.cl?Subject=Error%20en%20el%20sitio">
              soporte&#64;leit.cl
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );

  if (status === true) {
    return <SuccefulConfirmation />;
  }
  return <FailedConfirmation />;
};

const mapStateToProps = (state) => ({
  status: state.user.activated,
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      activateCode: user.getRegisterLink,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(EmailConfirmation);
