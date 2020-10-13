import React, { useState, useEffect } from "react";
import { Button, Container, Col, Row } from "reactstrap";
import "../Login/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from "react-router-dom";
import { Alert } from "reactstrap";
import { connect } from "react-redux";
import { user } from "../../actions";

import StepWizard from "react-step-wizard";
import { LeitSpinner } from "../../components";

const InvalidToken = () => (
  <div> El token ingresado es inválido o ha expirado </div>
);

const SuccessfulUpdatePassword = () => (
  <div> Tu contraseña ha sido actualizada con éxito </div>
);

const FailedUpdatePassword = (props) => (
  <Container>
    <Row> Recuperación de cuenta fallida </Row>
    <Button
      color="secondary"
      onClick={() => {
        props.volver();
        props.goToStep(1);
      }}
    >
      Volver
    </Button>
  </Container>
);

const UpdatePasswordSent = ({
  passwordUpdated,
  errors,
  passwordSent,
  goToStep,
}) => {
  if (passwordSent && passwordUpdated) {
    goToStep(3);
  } else if (passwordSent && errors && errors.updatePassword) {
    goToStep(4);
  }
  return <div>Cargando</div>;
};

const ChangePassword = ({ updatePassword, nextStep }) => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setError] = useState([]);

  const onSubmitPassword = (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setError(["Las contraseñas no coinciden"]);
    } else {
      setError([""]);
      updatePassword(password1);
      nextStep();
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitPassword}>
        <fieldset>
          {errors.length > 0 &&
            errors.map((error, index) => (
              <Alert key={index} color="warning">
                {error}
              </Alert>
            ))}
          <div className="col-12 form-input">
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faUnlock} />
                  </span>
                </div>
                <input
                  id="password1"
                  type="password"
                  className="form-control"
                  style={{ paddingLeft: "1em" }}
                  onChange={(e) => setPassword1(e.target.value)}
                  placeholder="Contraseña"
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faUnlock} />
                  </span>
                </div>
                <input
                  id="password2"
                  type="password"
                  className="form-control"
                  style={{ paddingLeft: "1em" }}
                  onChange={(e) => setPassword2(e.target.value)}
                  placeholder="Contraseña"
                />
              </div>
            </div>

            <div className="form-group">
              <button className="btn btn-danger" type="submit">
                Actualizar contraseña
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

const TokenInvalid = <div> El código ya fue usado o ha expirado. </div>;

const RecoverAccountConfirmation = ({
  location,
  updatePassword,
  validateToken,
  tokenIsValid,
  passwordUpdated,
  errors,
}) => {
  const [token, setToken] = useState("");
  const [passwordSent, setPasswordSent] = useState(false);

  useEffect(() => {
    let code = location.search;
    code = code.slice(code.indexOf("code=") + 5);
    setToken(code);
    validateToken(code);
  }, [setToken, validateToken, location.search]);

  const onUpdatePassword = (password) => {
    updatePassword(token, password);
    setPasswordSent(true);
  };

  const volver = () => {
    setPasswordSent(false);
  };

  return (
    <div className="login-background parallax">
      <div className="modal-dialog text-center">
        <div className="col-sm-9 main-section">
          <div className="modal-content">
            <h2>Recuperar Clave</h2>

            {tokenIsValid ? (
              <StepWizard
                className="stepContainer"
                onStepChange={() => {
                  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
                initialStep={1}
              >
                <ChangePassword updatePassword={onUpdatePassword} />

                <UpdatePasswordSent
                  passwordSent={passwordSent}
                  passwordUpdated={passwordUpdated}
                  errors={errors}
                />

                <SuccessfulUpdatePassword />
                <FailedUpdatePassword />
              </StepWizard>
            ) : (
              <InvalidToken />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tokenIsValid: state.user.resetPasswordTokenValid,
  passwordUpdated: state.user.resetPasswordConfirmed,
  errors: state.user.errors,
});

const mapActionsToProps = (dispatch) => ({
  updatePassword: (token, password) =>
    dispatch(user.resetPasswordConfirm(token, password)),
  validateToken: (token) => dispatch(user.resetPasswordValidate(token)),
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(RecoverAccountConfirmation);
