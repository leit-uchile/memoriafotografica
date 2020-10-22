import React, { useState } from "react";
import { Container, Col, Row } from "reactstrap";
import "../Login/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from "react-router-dom";
import { Alert } from "reactstrap";
import { connect } from "react-redux";
import { user } from "../../actions";
import { bindActionCreators } from "redux";
import { selectUserIsAuthenticated, selectErrors } from "../../reducers/user";

const RecoverAccount = ({ isAuthenticated, sendLink, linkSent, errors }) => {
  const [mail, setMail] = useState("");

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const RecoverAccountForm = (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendLink(mail);
        }}
      >
        <fieldset>
          {errors &&
            errors.length > 0 &&
            errors.map((error, index) => (
              <Alert key={index} color="warning" dismissable>
                {error.message}
              </Alert>
            ))}
          <div className="col-12 form-input">
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                </div>
                <input
                  id="email"
                  type="text"
                  className="form-control"
                  style={{ paddingLeft: "1em" }}
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  placeholder="Correo Electronico"
                />
              </div>
            </div>
            <div className="form-group">
              <button
                className="btn btn-danger"
                type="submit"
                style={{ width: "50%" }}
              >
                Enviar Correo de Recuperación
              </button>
            </div>
          </div>
        </fieldset>
      </form>
      <div className="col-12 forgot">
        <Link to={"/register"}>¿No tienes cuenta? Regístrate</Link>
      </div>
    </div>
  );

  const RecoverAccountSent = (props) => (
    <div>Acabamos de enviar un mail a {props.mail}.</div>
  );

  return (
    <div className="login-background parallax">
      <div className="modal-dialog text-center">
        <div className="col-sm-9 main-section">
          <div className="modal-content">
            <h2>Recuperar Clave</h2>
            {!linkSent ? (
              RecoverAccountForm
            ) : (
              <RecoverAccountSent mail={mail}></RecoverAccountSent>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  linkSent: state.user.resetPasswordRequest,
  isAuthenticated: selectUserIsAuthenticated(state),
  errors: selectErrors(state),
});

const mapActionsToProps = (dispatch) =>
  bindActionCreators(
    {
      sendLink: user.resetPasswordRequest,
    },
    dispatch
  );

export default connect(mapStateToProps, mapActionsToProps)(RecoverAccount);
