import React, { useState } from "react";
import { Container, Col, Row } from "reactstrap";
import "../Login/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, Redirect } from "react-router-dom";
import { Alert } from "reactstrap";
import { connect } from "react-redux";
import { user } from "../../actions";

const RecoverAccount = ({ isAuthenticated, sendLink, linkSent, errors }) => {
  const [mail, setMail] = useState("");

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  const RecoverAccountForm = (
    <div>
      <form
        onSubmit={(e) => {
          console.log("link sent");
          e.preventDefault();
          sendLink(mail);
        }}
      >
        <fieldset>
          {errors &&
            errors.email &&
            errors.email.length > 0 &&
            errors.email.map((error, index) => (
              <Alert key={index} color="warning">
                {error}
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
              <button className="btn btn-danger" type="submit">
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
  isAuthenticated: state.user.isAuthenticated,
  errors: state.user.errors,
});

const mapActionsToProps = (dispatch) => ({
  sendLink: (mail) => dispatch(user.resetPasswordRequest(mail)),
});

export default connect(mapStateToProps, mapActionsToProps)(RecoverAccount);
