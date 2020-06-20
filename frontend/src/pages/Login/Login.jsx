import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { user, site_misc } from "../../actions";
import { connect } from "react-redux";
import { Alert } from "reactstrap";
import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUnlock } from "@fortawesome/free-solid-svg-icons";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  genericChangeHandler = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.email, this.state.password);
  };

  componentWillMount() {
    this.props.setRoute("/login");
  }

  translateError = (error) => {
    var errorMessage;
    var firstError = error.length ? error[0] : error;
    switch (firstError) {
      case "Unable to log in with provided credentials.":
        errorMessage = "Tus credenciales no son correctas";
        break;
      default:
        errorMessage = "No podemos ingresarte al sitio";
        break;
    }
    return errorMessage;
  };

  render() {
    if (this.props.isAuthenticated) {
      if (this.props.loginRoute !== null) {
        const newRoute = this.props.loginRoute;
        this.props.setLoginSuccessRoute();
        return <Redirect to={newRoute} />;
      } else {
        return <Redirect to="/" />;
      }
    }
    return (
      <div className="login-background parallax">
        <div className="modal-dialog text-center">
          <div className="col-sm-9 main-section">
            <div className="modal-content">
              <h2>Inicia sesión</h2>
              <form onSubmit={this.onSubmit}>
                <fieldset>
                  {this.props.errors.length > 0 &&
                    this.props.errors.map((error) => (
                      <Alert key={error.field} color="warning">
                        {this.translateError(error.message)}
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
                          onChange={this.genericChangeHandler}
                          placeholder="Correo Electronico"
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
                          id="password"
                          type="password"
                          className="form-control"
                          style={{ paddingLeft: "1em" }}
                          onChange={this.genericChangeHandler}
                          placeholder="Contraseña"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <button className="btn btn-danger" type="submit">
                        Entrar
                      </button>
                    </div>
                  </div>
                </fieldset>
              </form>

              <div className="col-12 forgot">
                <Link to={"/register"}>¿No tienes cuenta? Regístrate</Link>
                {" / "}
                <Link to={"/recoveruser"}>¿Olvidaste tu clave?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let errors = [];
  if (state.user.errors) {
    errors = Object.keys(state.user.errors).map((field) => {
      return { field, message: state.user.errors[field] };
    });
  }
  return {
    errors,
    isAuthenticated: state.user.isAuthenticated,
    loginRoute: state.site_misc.loginSuccessRoute,
  };
};

const mapActionsToProps = (dispatch) => ({
  login: (email, password) => dispatch(user.login(email, password)),
  setRoute: (route) => dispatch(site_misc.setCurrentRoute(route)),
  setLoginSuccessRoute: () => dispatch(site_misc.addLoginRoute("")),
});

export default connect(mapStateToProps, mapActionsToProps)(Login);
