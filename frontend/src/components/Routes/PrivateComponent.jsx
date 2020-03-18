import React from "react";
import { Route, Redirect } from "react-router-dom";
import { misc } from "../../actions";
import { connect } from "react-redux";

const PrivateComponent = ({ component: Component, setLoginSuccessRoute, ...rest }) => {

  if ((rest.isAuthenticated === null || rest.isAuthenticated === false) && rest.location.pathname.includes(rest.path)) {
    console.log("Doing redirect on private route: ",rest.location,rest.match,rest.path)
    setLoginSuccessRoute(rest.location.pathname);
    return <Redirect to="/login" />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapActionToProps = dispatch => ({
  setLoginSuccessRoute: route => dispatch(misc.addLoginRoute(route))
});

export default connect(mapStateToProps, mapActionToProps)(PrivateComponent);
