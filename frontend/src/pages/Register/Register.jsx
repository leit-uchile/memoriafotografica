import React, { Component } from "react";
import RegisterLoginInfo from "./RegisterLoginInfo";
import { connect } from "react-redux";
import { auth } from "../../actions";
import { Button, Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import StepWizard from "react-step-wizard";
import LeitSpinner from "../../components/LeitSpinner";

const FailedRegistration = props => (
  <Container style={{ textAlign: "center", marginTop: "2em" }}>
    <Row>
      <Col>
        <h2> No pudimos realizar tu registro </h2>
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
        <Button color="warning" onClick={() => {
          props.back()
          props.goToStep(1)
          }}>
          Volver
        </Button>
      </Col>
    </Row>
  </Container>
);

const RegisterSent = ({ isAuthenticated, goToStep, errors }) => {
  if (isAuthenticated) {
    goToStep(4);
  }
  if (errors.length !== 0) {
    goToStep(3);
  }
  return (
    <Container style={{ textAlign: "center", marginTop: "2em" }}>
      <Row>
        <Col>
          <h2>Completando registro</h2>
        </Col>
      </Row>
      <Row>
        <Col style={{ marginTop: "2em" }}>
          <LeitSpinner />
        </Col>
      </Row>
    </Container>
  );
};

const SuccessfulRegistration = props => (
  <Container style={{ textAlign: "center", marginTop: "2em" }}>
    <Row>
      <Col>
        <h2>¡Registro con éxito!</h2>
      </Col>
    </Row>
    <Row>
      <Col>
        <p style={{ marginTop: "2em" }}>
          Por favor confirma tu correo electronico
        </p>
      </Col>
    </Row>
  </Container>
);

class Register extends Component {
  constructor(Props) {
    super(Props);
    this.state = {
      currentPage: 0,
      loginInfo: null,
      calledResgister: false,
    };
    this.volver = this.volver.bind(this);
    this.saveUserLogin = this.saveUserLogin.bind(this);
    this.registerToBack = this.registerToBack.bind(this);
  }

  volver() {
    // Clear errors
    this.props.cleanErrors();
    this.setState({
      calledResgister: false
    });
  }

  saveUserLogin(info) {
    this.setState(
      {
        currentPage: this.state.currentPage + 1,
        loginInfo: { ...info },
      },
      () => this.registerToBack()
    );
  }

  registerToBack() {
    this.setState({ calledResgister: true });
    setTimeout(
      this.props.register,
      2000,
      this.state.loginInfo.email,
      this.state.loginInfo.password,
      this.state.loginInfo.name,
      this.state.loginInfo.lastname,
      this.state.loginInfo.date,
      this.state.loginInfo.rol,
      this.state.loginInfo.avatar
    );
  }

  render() {
    // Just in case!
    if (this.props.isAuthenticated && !this.state.calledResgister) {
      return <Redirect to="/" />;
    }

    return (
      <StepWizard
        className="stepContainer"
        onStepChange={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
        initialStep={1}>
        <RegisterLoginInfo
          saveInfo={this.saveUserLogin}
          cache={this.state.loginInfo}
        />
        <RegisterSent
          isAuthenticated={this.props.isAuthenticated}
          errors={this.props.errors}
        />
        <FailedRegistration back={this.volver} />
        <SuccessfulRegistration />
      </StepWizard>
    );
  }
}

const mapStateToProps = state => {
  let errors = [];
  if (state.auth.errors) {
    errors = Object.keys(state.auth.errors).map(field => {
      return { field, message: state.auth.errors[field] };
    });
  }
  return {
    errors,
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapActionsToProps = dispatch => {
  return {
    register: (username, password, name, lastname, date, rol, avatar) => {
      return dispatch(
        auth.register(username, password, name, lastname, date, rol, avatar)
      );
    },
    cleanErrors: () => {
      return dispatch(auth.cleanErrors());
    }
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Register);